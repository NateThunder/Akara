const {spawnSync} = require('node:child_process');
const code = async (page) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  const routes = ['/', '/shop/all', '/bespoke-cakes', '/about', '/contact'];
  await page.goto('http://localhost:3000/shop/all');
  routes.push(await page.locator('.shop-product-image').first().getAttribute('href'));
  const failures=[];
  for (const route of routes) {
    await page.goto('http://localhost:3000'+route);
    for (const width of [320,375,414,480,481,600,601,640,641,700,701,768,900,901,1023,1024,1280,1440]) {
      await page.setViewportSize({width,height:width===900?414:900});
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
      if(overflow) failures.push({route,width,type:'overflow'});
      if([375,768,1024,1280,1440].includes(width)) await page.screenshot({path:`output/playwright/mobile-after-${route.replaceAll('/','_') || 'home'}-${width}.png`,fullPage:true});
    }
  }
  await page.goto('http://localhost:3000/');
  await page.setViewportSize({width:320,height:740});
  await page.getByRole('button',{name:'Open menu',exact:true}).click();
  if(await page.locator('#main-navigation a:visible').count()!==7) failures.push('menu destinations');
  await page.keyboard.press('Tab'); await page.keyboard.press('Escape');
  if(!await page.getByRole('button',{name:'Open menu',exact:true}).evaluate(el=>el===document.activeElement)) failures.push('Escape focus');
  if(await page.locator('#main-navigation a:visible').count()) failures.push('closed links visible');
  await page.getByRole('button',{name:'Open menu',exact:true}).click();
  await page.locator('#main-navigation').getByRole('link',{name:'Shop',exact:true}).click();
  await page.waitForURL('**/shop/all');
  await page.getByRole('searchbox').fill('chocolate');
  if(!await page.locator('.shop-product').count()) failures.push('search results');
  await page.getByRole('combobox').selectOption('price-low');
  await page.getByRole('searchbox').fill('');
  await page.getByRole('button',{name:'Gift Cards',exact:true}).click();
  await page.waitForURL('**/shop/all?category=Gift+Cards');
  await page.goto('http://localhost:3000/contact');
  await page.getByRole('button',{name:'Send message'}).click();
  if(!await page.locator('#contact-name').evaluate(el=>el.validity.valueMissing)) failures.push('required validation');
  await page.goto('http://localhost:3000/');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.getByRole('button',{name:'Show cake photo 2 of 7'}).click();
  if(await page.getByRole('button',{name:'Show cake photo 2 of 7'}).getAttribute('aria-pressed')!=='true') failures.push('carousel selection');
  await page.getByRole('button',{name:'Play slideshow'}).click();
  await page.getByRole('button',{name:'Pause slideshow'}).click();
  return {routes,failures};
};
const result=spawnSync(process.execPath,['C:/Users/NSome/AppData/Local/npm-cache/_npx/31e32ef8478fbf80/node_modules/@playwright/cli/playwright-cli.js','run-code',code.toString()],{encoding:'utf8'});
console.log(result.stdout,result.stderr); process.exit(result.status??1);
