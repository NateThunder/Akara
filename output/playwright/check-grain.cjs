async (page) => {
 const failures=[];
 await page.goto('http://localhost:3000');
 await page.setViewportSize({width:1440,height:1000});
 await page.screenshot({path:'output/playwright/grain-after-desktop.png'});
 const routes=['/','/shop/all','/bespoke-cakes','/about','/contact','/custom-cakes'];
 await page.goto('http://localhost:3000/shop/all');
 const product=await page.locator('a').evaluateAll(els=>els.map(e=>e.getAttribute('href')).find(h=>h?.startsWith('/shop/')&&h!='/shop/all'&&!h.includes('?')));
 if(product) routes.push(product);
 for(const route of routes){
  await page.goto('http://localhost:3000'+route);
  for(const width of [320,375,414,768,844,1024,1280,1440]){
   await page.setViewportSize({width,height:width===844?390:900});
   if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) failures.push({route,width});
  }
 }
 await page.goto('http://localhost:3000');
 for(const [name,width] of [['phone',375],['tablet',768]]){
  await page.setViewportSize({width,height:900});
  await page.screenshot({path:'output/playwright/grain-after-'+name+'.png'});
 }
 return {failures,routes};
}


