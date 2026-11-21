const {spawnSync}=require('node:child_process');
const code=async(page)=>{
 const results=[]; const console={log:(...args)=>results.push(args)}; await page.emulateMedia({reducedMotion:'reduce'});
 for(const width of [320,375,414,768,1023,1024,1280,1440]){
  await page.setViewportSize({width,height:900});await page.goto('http://localhost:3000/');
  console.log('home',width,await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,intro:document.querySelector('.editorial-intro').offsetHeight,link:document.querySelector('.bakery-story-image').getAttribute('href')})));
  if([375,768,1440].includes(width))await page.screenshot({path:`output/playwright/client-edits-${width}.png`,fullPage:true});
  await page.evaluate(()=>window.scrollTo(0,1200));await page.waitForTimeout(100);
  console.log('header',width,await page.locator('.site-header').evaluate(e=>({top:e.getBoundingClientRect().top,background:getComputedStyle(e).backgroundColor})));
 }
 for(const route of ['/shop/all','/custom-cakes','/bespoke-cakes','/about','/contact']){
  await page.goto('http://localhost:3000'+route);await page.evaluate(()=>window.scrollTo(0,600));
  console.log(route,await page.locator('.site-header').evaluate(e=>e.getBoundingClientRect().top));
 }
 await page.setViewportSize({width:375,height:812});await page.goto('http://localhost:3000/');
 await page.getByRole('button',{name:/menu/i}).click();await page.keyboard.press('Escape');
 console.log('menu escape',await page.getByRole('button',{name:/menu/i}).evaluate(e=>({expanded:e.getAttribute('aria-expanded'),focused:e===document.activeElement}))); return results;
};
const r=spawnSync(process.execPath,['C:/Users/NSome/AppData/Local/npm-cache/_npx/31e32ef8478fbf80/node_modules/@playwright/cli/playwright-cli.js','run-code',code.toString()],{encoding:'utf8'});console.log(r.stdout,r.stderr);

