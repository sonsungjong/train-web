const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const resourcesDir = path.join(__dirname, '../src/app/resources');
const outputFile = path.join(__dirname, '../src/lib/answers.json');

// Paths verified via search
const GCC_PATH = 'C:\\msys64\\mingw64\\bin\\gcc.exe';
// Using Android Studio's bundled JDK
const JAVAC_PATH = 'C:\\Program Files\\Android\\Android Studio\\jbr\\bin\\javac.exe';
const JAVA_PATH = 'C:\\Program Files\\Android\\Android Studio\\jbr\\bin\\java.exe';

const answers = {};

function processDirectory(dir) {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir);

    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else {
            const ext = path.extname(item).toLowerCase();
            let output = null;
            let commentPrefix = '';

            try {
                if (ext === '.c') {
                    commentPrefix = '//';
                    const exePath = fullPath.replace('.c', '.exe');
                    const gccCmd = fs.existsSync(GCC_PATH) ? `"${GCC_PATH}"` : 'gcc';

                    if (fs.existsSync(GCC_PATH) || process.env.PATH.includes('gcc')) {
                        execSync(`${gccCmd} "${fullPath}" -o "${exePath}"`, { stdio: 'pipe' });
                        if (fs.existsSync(exePath)) {
                            output = execSync(`"${exePath}"`, { encoding: 'utf-8', stdio: 'pipe' }).trim();
                            try { fs.unlinkSync(exePath); } catch (e) { }
                        }
                    } else {
                        console.warn(`[SKIP] GCC not found for ${item}`);
                    }
                } else if (ext === '.java') {
                    commentPrefix = '//';
                    const javacCmd = fs.existsSync(JAVAC_PATH) ? `"${JAVAC_PATH}"` : 'javac';
                    const javaCmd = fs.existsSync(JAVA_PATH) ? `"${JAVA_PATH}"` : 'java';

                    if (fs.existsSync(JAVAC_PATH) || process.env.PATH.includes('javac')) {
                        // 1. Compile
                        execSync(`${javacCmd} -encoding UTF-8 "${fullPath}"`, { stdio: 'pipe' });

                        // 2. Classname (assume file name == class name)
                        const className = path.basename(item, '.java');
                        const classDir = path.dirname(fullPath);

                        // 3. Run
                        output = execSync(`${javaCmd} -cp "${classDir}" ${className}`, { encoding: 'utf-8', stdio: 'pipe' }).trim();

                        // 4. Cleanup
                        const classFile = path.join(classDir, `${className}.class`);
                        if (fs.existsSync(classFile)) {
                            try { fs.unlinkSync(classFile); } catch (e) { }
                        }
                    } else {
                        console.warn(`[SKIP] Javac not found for ${item}`);
                    }
                } else if (ext === '.py') {
                    commentPrefix = '#';
                    output = execSync(`python "${fullPath}"`, { encoding: 'utf-8', stdio: 'pipe' }).trim();
                }

                if (output !== null) {
                    console.log(`[OK] ${item} => ${output}`);
                    answers[item] = output;

                    // Append Answer to File
                    let content = fs.readFileSync(fullPath, 'utf-8');

                    const lines = content.split('\n');
                    while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
                        lines.pop();
                    }

                    const lastLine = lines[lines.length - 1];
                    // Flexible check for existing answer
                    if (lastLine && (lastLine.includes('Output:') || lastLine.trim().startsWith(commentPrefix + ' Output:'))) {
                        lines.pop();
                    }

                    content = lines.join('\n');
                    const newContent = `${content}\n\n${commentPrefix} Output: ${output}\n`;
                    fs.writeFileSync(fullPath, newContent, 'utf-8');
                }
            } catch (err) {
                console.error(`[FAIL] ${item}: ${err.message ? err.message.split('\n')[0] : err}`);
            }
        }
    });
}

console.log("Generating answers and appending to source files...");
processDirectory(resourcesDir);

fs.writeFileSync(outputFile, JSON.stringify(answers, null, 2));
console.log(`Done. Saved to ${outputFile}`);
