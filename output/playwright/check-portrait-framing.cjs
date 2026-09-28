async page => {
  await page.emulateMedia({reducedMotion:'no-preference'});
  const results=[];
  for(const width of [320,375,414,768,1024,1280,1440]) {
    await page.setViewportSize({width,height:900});
    const photo=page.locator('.story-founder-photo');
    await photo.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
    // Check the strongest upward drift, where head cropping is most likely.
    await photo.evaluate(e=>e.style.setProperty('--story-drift',`${-e.clientHeight*.02}px`));
    results.push(await photo.evaluate(e=>({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,position:getComputedStyle(e.querySelector('img')).objectPosition})));
    if([375,768,1440].includes(width)) await photo.screenshot({path:`output/playwright/portrait-full-face-${width}.png`});
  }
  return results;
}
