const fs = require('fs');
const path = require('path');

function walk(dir) {
  let files = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory() && !full.includes('node_modules')) {
      files = files.concat(walk(full));
    } else if (stat.isFile() && f.endsWith('.js') && !f.includes('backup') && !f.includes('original') && !f.includes('_old')) {
      files.push(full);
    }
  }
  return files;
}

// Look for useEffect dependency arrays that contain callback prop names (on*, handle*)
const callbackPattern = /},\s*\[([^\]]*(?:on[A-Z]|handle[A-Z])[^\]]*)\]/g;

for (const file of walk('src')) {
  const src = fs.readFileSync(file, 'utf-8');
  let match;
  callbackPattern.lastIndex = 0;
  while ((match = callbackPattern.exec(src)) !== null) {
    const lineNum = src.substring(0, match.index).split('\n').length;
    const rel = file.replace(/^.*[\\\/]src[\\\/]/, '');
    console.log(`${rel}:${lineNum}: ${match[0].trim()}`);
  }
}
