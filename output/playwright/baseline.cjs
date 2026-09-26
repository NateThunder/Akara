const {spawnSync} = require('node:child_process');
const code = async (page) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  for (const width of [1024,1280,1440]) {
    await page.setViewportSize({width,height:900});
    await page.goto('http://localhost:3000/');
    await page.screenshot({path:`output/playwright/mobile-before-${width}.png`,fullPage:true});
  }
};
const result = spawnSync(process.execPath,['C:/Users/NSome/AppData/Local/npm-cache/_npx/31e32ef8478fbf80/node_modules/@playwright/cli/playwright-cli.js','run-code',code.toString()],{encoding:'utf8'});
console.log(result.stdout,result.stderr);
process.exit(result.status ?? 1);
