const {spawnSync}=require('node:child_process');
const code=async(page)=>{
 await page.goto('http://localhost:3000/'); await page.emulateMedia({reducedMotion:'reduce'});
 const failures=[];
 for(const width of [320,375,414,768,1023]) {
  await page.setViewportSize({width,height:740});
  await page.getByRole('button',{name:'Open menu',exact:true}).click();
  const dialog=page.getByRole('dialog');
  if(await dialog.getByRole('link').count()!==7) failures.push('links');
  await page.keyboard.press('Shift+Tab');
  if(!await dialog.getByRole('link',{name:'Contact',exact:true}).evaluate(el=>el===document.activeElement)) failures.push('reverse trap');
  await page.keyboard.press('Tab');
  if(!await page.getByRole('button',{name:'Close menu',exact:true}).evaluate(el=>el===document.activeElement)) failures.push('forward trap');
  if(await page.evaluate(()=>document.body.style.overflow)!=='hidden') failures.push('scroll lock');
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) failures.push('overflow');
  if(width===375) await page.screenshot({path:'output/playwright/drawer-375.png'});
  await page.keyboard.press('Escape');
  if(!await page.getByRole('button',{name:'Open menu',exact:true}).evaluate(el=>el===document.activeElement)) failures.push('focus return');
 }
 await page.getByRole('button',{name:'Open menu',exact:true}).click(); await page.mouse.click(5,200);
 if(await page.locator('dialog').evaluate(el=>el.open)) failures.push('backdrop');
 await page.getByRole('button',{name:'Open menu',exact:true}).click();
 await page.getByRole('dialog').getByRole('link',{name:'About',exact:true}).click();
 await page.waitForURL('**/about');
 if(await page.locator('dialog').evaluate(el=>el.open)) failures.push('link close');
 await page.getByRole('button',{name:'Open menu',exact:true}).click(); await page.setViewportSize({width:1024,height:900});
 if(await page.locator('dialog').evaluate(el=>el.open)) failures.push('resize close');
 for(const width of [1024,1280,1440]) {await page.setViewportSize({width,height:900});await page.goto('http://localhost:3000/');await page.screenshot({path:`output/playwright/mobile-after-_-${width}.png`,fullPage:true});}
 return {failures};
};
const r=spawnSync(process.execPath,['C:/Users/NSome/AppData/Local/npm-cache/_npx/31e32ef8478fbf80/node_modules/@playwright/cli/playwright-cli.js','run-code',code.toString()],{encoding:'utf8'});console.log(r.stdout,r.stderr);
