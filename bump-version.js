const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const oldVersion = manifest.version;
const versionParts = oldVersion.split('.').map(Number);

if (versionParts.length === 3 && !versionParts.some(isNaN)) {
  versionParts[2] += 1; // Bump patch version
} else {
  console.error('Invalid version format in manifest.json');
  process.exit(1);
}

const newVersion = versionParts.join('.');
manifest.version = newVersion;

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Version bumped from ${oldVersion} to ${newVersion}`);
