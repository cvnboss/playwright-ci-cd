const fs = require('fs');
const path = require('path');

const historySource = path.join(__dirname, '../allure-report/history');
const historyDestination = path.join(__dirname, '../allure-results/history');

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) {
    return;
  }
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }
  fs.readdirSync(from).forEach((element) => {
    const stat = fs.lstatSync(path.join(from, element));
    if (stat.isFile()) {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    } else if (stat.isDirectory()) {
      copyFolderSync(path.join(from, element), path.join(to, element));
    }
  });
}

try {
  if (fs.existsSync(historySource)) {
    console.log('Copying history from allure-report to allure-results...');
    copyFolderSync(historySource, historyDestination);
    console.log('History copied successfully!');
  } else {
    console.log('No history found in allure-report. Starting a fresh trend.');
  }
} catch (err) {
  console.error('Error copying history:', err);
}
