const fs = require('fs');
const path = require('path');

const FOLDER = path.join(__dirname, '../platforms/android/cordova-plugin-browsertab');
const FILE_SUFFIX = '-BrowserTab.gradle';

fs.readdirSync(FOLDER)
.filter(filename => filename.endsWith(FILE_SUFFIX))
.forEach(filename => {
  const file = path.join(FOLDER, filename);
  const contents = fs.readFileSync(file).toString('utf-8')
    .replace('def minSdkVersion = 16', 'def minSdkVersion = 19');
  fs.writeFileSync(file, contents, {encoding: 'utf-8'});
});