const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'src/app/resources/LECTURE');
const dst = path.join(__dirname, '..', 'src/app/resources/TEST');

if (!fs.existsSync(dst)) fs.mkdirSync(dst, { recursive: true });

fs.readdirSync(src)
  .filter(f => f.includes('문제풀이'))
  .forEach(f => {
    fs.copyFileSync(path.join(src, f), path.join(dst, f));
    fs.unlinkSync(path.join(src, f));
    console.log('Moved:', f);
  });
