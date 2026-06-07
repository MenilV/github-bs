const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('=== Starting Chrome Extension Tests ===');

let exitCode = 0;

function logPass(message) {
  console.log(`[PASS] ${message}`);
}

function logFail(message, error) {
  console.error(`[FAIL] ${message}`);
  if (error) console.error(error);
  exitCode = 1;
}

// 1. Verify manifest.json exists and is valid JSON
let manifest;
try {
  const manifestPath = path.join(__dirname, 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    throw new Error('manifest.json does not exist');
  }
  const content = fs.readFileSync(manifestPath, 'utf8');
  manifest = JSON.parse(content);
  logPass('manifest.json is valid JSON');
} catch (e) {
  logFail('manifest.json validation failed', e);
  process.exit(1);
}

// 2. Check essential manifest fields
try {
  const requiredFields = ['manifest_version', 'name', 'version', 'description'];
  requiredFields.forEach(field => {
    if (!manifest[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  });
  if (manifest.manifest_version !== 3) {
    throw new Error(`Expected manifest_version 3, got ${manifest.manifest_version}`);
  }
  logPass('Manifest essential fields are valid');
} catch (e) {
  logFail('Manifest field validation failed', e);
}

// 3. Verify files referenced in manifest exist
try {
  // Check icons
  if (manifest.icons) {
    Object.values(manifest.icons).forEach(iconPath => {
      const fullPath = path.join(__dirname, iconPath);
      if (!fs.existsSync(fullPath)) {
        throw new Error(`Icon file not found: ${iconPath}`);
      }
    });
  }

  // Check content scripts
  if (manifest.content_scripts) {
    manifest.content_scripts.forEach(script => {
      if (script.js) {
        script.js.forEach(jsPath => {
          const fullPath = path.join(__dirname, jsPath);
          if (!fs.existsSync(fullPath)) {
            throw new Error(`Content script JS file not found: ${jsPath}`);
          }
        });
      }
      if (script.css) {
        script.css.forEach(cssPath => {
          const fullPath = path.join(__dirname, cssPath);
          if (!fs.existsSync(fullPath)) {
            throw new Error(`Content script CSS file not found: ${cssPath}`);
          }
        });
      }
    });
  }

  // Check web accessible resources
  if (manifest.web_accessible_resources) {
    manifest.web_accessible_resources.forEach(resource => {
      if (resource.resources) {
        resource.resources.forEach(resourcePath => {
          if (!resourcePath.includes('*')) {
            const fullPath = path.join(__dirname, resourcePath);
            if (!fs.existsSync(fullPath)) {
              throw new Error(`Web accessible resource not found: ${resourcePath}`);
            }
          }
        });
      }
    });
  }

  logPass('All files referenced in manifest exist');
} catch (e) {
  logFail('Referenced files check failed', e);
}

// 4. Check syntax of Javascript files using node --check
const jsFiles = ['content.js', 'bump-version.js', 'test.js', 'release.js'];
jsFiles.forEach(file => {
  try {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
      execSync(`node --check "${fullPath}"`);
      logPass(`Syntax check passed for ${file}`);
    } else {
      throw new Error(`File ${file} does not exist for syntax check`);
    }
  } catch (e) {
    logFail(`Syntax check failed for ${file}`, e.message);
  }
});

console.log('=== Tests Finished ===');
if (exitCode !== 0) {
  console.error('Some tests failed!');
  process.exit(exitCode);
} else {
  console.log('All tests passed successfully!');
}
