const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const resourcesDir = path.join(__dirname, '../src/app/resources');
const outputFile = path.join(__dirname, '../src/lib/answers.json');

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
                    execSync(`gcc "${fullPath}" -o "${exePath}"`, { stdio: 'pipe' });
                    if (fs.existsSync(exePath)) {
                        output = execSync(`"${exePath}"`, { encoding: 'utf-8', stdio: 'pipe' }).trim();
                        fs.unlinkSync(exePath);
                    }
                } else if (ext === '.java') {
                    commentPrefix = '//';
                    // Assumes single file execution for Java 11+
                    output = execSync(`java "${fullPath}"`, { encoding: 'utf-8', stdio: 'pipe' }).trim();
                } else if (ext === '.py') {
                    commentPrefix = '#';
                    output = execSync(`python "${fullPath}"`, { encoding: 'utf-8', stdio: 'pipe' }).trim();
                }

                if (output !== null) {
                    console.log(`[OK] ${item} => ${output}`);
                    answers[item] = output;

                    // Append Answer to File
                    let content = fs.readFileSync(fullPath, 'utf-8');

                    // Remove existing "Answer:" or "Output:" comments at the end to prevent duplicates
                    // Heuristic: remove last line if it starts with comment and contains "Answer:" or "Output:"
                    const lines = content.split('\n');
                    // Trim trailing empty lines first
                    while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
                        lines.pop();
                    }

                    // Check last line
                    const lastLine = lines[lines.length - 1];
                    if (lastLine && (lastLine.includes('Answer:') || lastLine.includes('Output:'))) {
                        lines.pop(); // Remove old answer
                    }

                    // Rebuild content
                    content = lines.join('\n');

                    // Add new answer
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
