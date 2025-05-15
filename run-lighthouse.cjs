// run-lighthouse.cjs
const fs = require('fs');

async function runLighthouse() {
  const lighthouse = (await import('lighthouse')).default;
  const chromeLauncher = await import('chrome-launcher');
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = { output: 'html', port: chrome.port };
  const runnerResult = await lighthouse('http://localhost:5000', options);
  fs.writeFileSync('lighthouse-report.html', runnerResult.report);
  await chrome.kill();
  console.log('Lighthouse report generated: lighthouse-report.html');
}

runLighthouse().catch(console.error);