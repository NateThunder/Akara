async page => {
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.goto('http://localhost:3000/about');
 const results=[];
 for (const width of [320,375,414,767,768,769,1023,1024,1025,1280,1440]) {
  await page.setViewportSize({width,height:900});
  results.push(await page.evaluate(()=>({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth})));
 }
 for (const width of [320,375,768]) {
  await page.setViewportSize({width,height:900});
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.locator('.story-founder-photo').scrollIntoViewIfNeeded();
  await page.locator('.story-founder').screenshot({path:`output/playwright/mobile-reference-founder-${width}.png`});
  await page.locator('.story-today').screenshot({path:`output/playwright/mobile-reference-today-${width}.png`});
 }
 return results;
}
