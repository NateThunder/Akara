async page => {
 const results=[];
 for(const route of ['/','/shop/all','/bespoke-cakes','/about','/contact','/custom-cakes']) {
  await page.goto(`http://localhost:3000${route}`);
  await page.setViewportSize({width:375,height:812});
  const footer=page.locator('.site-footer');
  await footer.scrollIntoViewIfNeeded();
  results.push(await footer.evaluate(e=>({route:location.pathname,columns:getComputedStyle(e.querySelector('.footer-inner')).gridTemplateColumns,overflow:document.documentElement.scrollWidth>innerWidth})));
 }
 for(const width of [320,375,414,480,481,700,701,768,1023,1024,1280,1440]) {
  await page.setViewportSize({width,height:900});
  results.push(await page.locator('.site-footer').evaluate(e=>({width:innerWidth,height:e.clientHeight,columns:getComputedStyle(e.querySelector('.footer-inner')).gridTemplateColumns,overflow:document.documentElement.scrollWidth>innerWidth})));
  if([320,414,768,1440].includes(width)) await page.locator('.site-footer').screenshot({path:`output/playwright/footer-after-${width}.png`});
 }
 return results;
}
