import fs from 'fs';
import path from 'path';

const resourcesBase = path.join(process.cwd(), 'src/app/resources');
const lectureDir = path.join(resourcesBase, 'LECTURE');

const categoryPrefixes = {
    c: 'C',
    java: 'JAVA',
    python: 'PY',
    sql: 'SQL'
};

const testExtensions = {
    c: ['.c'],
    java: ['.java', '.class'],
    python: ['.py'],
    sql: ['.sql']
};

export async function getLectures(category) {
    if (!fs.existsSync(lectureDir)) return [];

    const files = fs.readdirSync(lectureDir);
    const prefix = categoryPrefixes[category];

    // Safety: prefix might be undefined if invalid category
    if (!prefix) return [];

    return files
        .filter(file => file.startsWith(prefix) && file.endsWith('.md'))
        .map(file => ({
            slug: file,
            title: file.replace('.md', ''),
            category
        }));
}

export async function getTests(category) {
    const categoryName = category.toUpperCase();
    let categoryDir = path.join(resourcesBase, categoryName);

    if (!fs.existsSync(categoryDir)) {
        return [];
    }

    const files = fs.readdirSync(categoryDir);
    const validExtensions = testExtensions[category] || [];

    // Group files by baseId
    const groups = {};

    files.forEach(file => {
        if (!validExtensions.some(ext => file.endsWith(ext))) return;

        const ext = path.extname(file);
        const nameWithoutExt = path.basename(file, ext);

        // Determine Base ID
        let baseId = nameWithoutExt;
        let suffix = "";

        if (nameWithoutExt.endsWith('_g')) {
            baseId = nameWithoutExt.slice(0, -2);
            suffix = "_g";
        } else if (nameWithoutExt.endsWith('_c')) {
            baseId = nameWithoutExt.slice(0, -2);
            suffix = "_c";
        }

        if (!groups[baseId]) {
            groups[baseId] = {
                slug: baseId, // The slug for the URL is now the Base ID
                title: baseId,
                category,
                files: []
            };
        }
        groups[baseId].files.push({ file, suffix });
    });

    // Convert groups to array
    const problems = Object.values(groups);

    // Sort problems by ID (Ascending)
    problems.sort((a, b) => a.slug.localeCompare(b.slug));

    return problems;
}

export async function getTestVariants(category, baseId) {
    const categoryName = category.toUpperCase();
    const categoryDir = path.join(resourcesBase, categoryName);

    // We need to re-scan or just construct the filenames.
    // Constructing is risky if files don't exist. Scanning is safer.
    // But we know the patterns: [baseId]_g.[ext], [baseId]_c.[ext], [baseId].[ext]
    // And we need the extensions.

    if (!fs.existsSync(categoryDir)) return [];

    const validExtensions = testExtensions[category] || [];
    const files = fs.readdirSync(categoryDir);

    // Find all files matching this baseId
    const matchedFiles = files.filter(file => {
        if (!validExtensions.some(ext => file.endsWith(ext))) return false;
        const ext = path.extname(file);
        const nameWithoutExt = path.basename(file, ext);

        if (nameWithoutExt === baseId) return true;
        if (nameWithoutExt === `${baseId}_g`) return true;
        if (nameWithoutExt === `${baseId}_c`) return true;

        return false;
    });

    // Map to variant objects
    const variants = matchedFiles.map(file => {
        const ext = path.extname(file);
        const nameWithoutExt = path.basename(file, ext);

        let type = 'original';
        if (nameWithoutExt.endsWith('_g')) type = 'practice_g';
        else if (nameWithoutExt.endsWith('_c')) type = 'practice_c';

        // Load content
        const content = fs.readFileSync(path.join(categoryDir, file), 'utf-8');

        return {
            filename: file,
            type,
            content
        };
    });

    // Sort Order: _g -> _c -> original
    const order = { 'practice_g': 0, 'practice_c': 1, 'original': 2 };
    variants.sort((a, b) => order[a.type] - order[b.type]);

    return variants;
}

export async function getResourceContent(type, slug) {
    // Legacy support for Lecture (slug is filename)
    if (type === 'lecture') {
        const filePath = path.join(lectureDir, slug);
        if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, 'utf-8');
        }
    }
    return null;
}
