async page => {
 const results=[];
 for (const route of ['/', '/shop/all','/bespoke-cakes','/about','/contact']) {
  await page.goto('http://localhost:3000'+route);
  for (const width of [320,375,414,640,641,768,844,1023,1024,1280,1440]) {
   await page.setViewportSize({width,height:width===844?390:900});
   const result=await page.locator('.service-strip').evaluate(e=>({text:e.innerText,overflow:document.documentElement.scrollWidth>innerWidth,stripOverflow:e.scrollWidth>e.clientWidth,rows:[...new Set([...e.children].map(x=>x.getBoundingClientRect().top))].length}));
   if(result.overflow||result.stripOverflow||result.rows!==1) results.push({route,width,...result});
   if(route==='/'&&[320,375,768,1024,1280,1440].includes(width)) await page.locator('.service-strip').screenshot({path:`output/playwright/strip-after-${width}.png`});
  }
 }
 await page.goto('http://localhost:3000/shop/all');
 const href=await page.locator('a[href^="/shop/"]').evaluateAll(es=>es.map(e=>e.getAttribute('href')).find(h=>h!='/shop/all'&&!h.includes('?')));
 if(href){await page.goto('http://localhost:3000'+href);for(const width of [320,375,414,768,1024,1280,1440]){await page.setViewportSize({width,height:900});results.push({product:href,width,...await page.locator('.service-strip').evaluate(e=>({overflow:document.documentElement.scrollWidth>innerWidth,rows:[...new Set([...e.children].map(x=>x.getBoundingClientRect().top))].length}))});}}
 return results;
}
