const fs = require('fs');
const chromeWebstoreUploadRaw = require('chrome-webstore-upload');
const chromeWebstoreUpload = chromeWebstoreUploadRaw.default || chromeWebstoreUploadRaw;

// Read configurations from environment variables for security.
// Fallback extension ID is set to your specified extension ID.
const store = chromeWebstoreUpload({
  extensionId: process.env.EXTENSION_ID || 'ecnglinljpjkbgmdpeiglonddahpbkeb',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
});

const zipFile = fs.createReadStream('github-bs.zip');

async function main() {
  console.log('Uploading extension to Chrome Web Store...');
  try {
    const uploadResult = await store.uploadExisting(zipFile);
    console.log('Upload success result:', JSON.stringify(uploadResult, null, 2));

    console.log('Publishing extension...');
    const publishResult = await store.publish();
    console.log('Publish success result:', JSON.stringify(publishResult, null, 2));
  } catch (err) {
    console.error('Error during Chrome Web Store release:', err);
    process.exit(1);
  }
}

main();
