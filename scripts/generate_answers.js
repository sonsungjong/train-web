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

            try {
                if (ext === '.c') {
                    // Compile C
                    const exePath = fullPath.replace('.c', '.exe');
                    execSync(`gcc "${fullPath}" -o "${exePath}"`, { stdio: 'pipe' });
                    // Run C
                    if (fs.existsSync(exePath)) {
                        output = execSync(`"${exePath}"`, { encoding: 'utf-8', stdio: 'pipe' }).trim();
                        // Cleanup
                        fs.unlinkSync(exePath);
                    }
                } else if (ext === '.java') {
                    // Compile Java
                    // Note: Java is tricky with packages/class names. Assuming default package or simple files.
                    // We need to run `java` on the file directly if Java 11+
                    // Or compile then run.
                    // Let's try single-file source code execution (Java 11+): `java Source.java`
                    output = execSync(`java "${fullPath}"`, { encoding: 'utf-8', stdio: 'pipe' }).trim();
                } else if (ext === '.py') {
                    // Run Python
                    output = execSync(`python "${fullPath}"`, { encoding: 'utf-8', stdio: 'pipe' }).trim();
                }

                if (output !== null) {
                    console.log(`[OK] ${item} => ${output}`);
                    answers[item] = output;
                }
            } catch (err) {
                console.error(`[FAIL] ${item}: ${err.message.split('\n')[0]}`);
            }
        }
    }); // forEach
}

console.log("Generating answers...");
processDirectory(resourcesDir);

fs.writeFileSync(outputFile, JSON.stringify(answers, null, 2));
console.log(`Done. Saved to ${outputFile}`);
