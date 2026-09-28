async page => {
  await page.emulateMedia({reducedMotion:'no-preference'});
  const results=[];
  for (const width of [320,375,414,768,1024,1280,1440]) {
    await page.setViewportSize({width,height:900});
    await page.locator('.story-founder-photo').scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
    const before=await page.locator('.story-founder-photo img').evaluate(e=>getComputedStyle(e).transform);
    await page.mouse.wheel(0,220);
    await page.waitForTimeout(250);
    const after=await page.locator('.story-founder-photo img').evaluate(e=>getComputedStyle(e).transform);
    results.push({width,before,after,parallax:before!==after,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});
  }
  for (const width of [375,768,1440]) {
    await page.setViewportSize({width,height:900});
    for (const section of await page.locator('.akara-story > section').all()) {
      await section.scrollIntoViewIfNeeded();
    }
    await page.evaluate(()=>scrollTo(0,0));
    await page.waitForTimeout(1200);
    await page.screenshot({path:`output/playwright/about-motion-after-${width}.png`,fullPage:true});
  }
  await page.setViewportSize({width:844,height:390});
  results.push({landscape:true,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});
  await page.emulateMedia({reducedMotion:'reduce'});
  const reduced=await page.locator('.story-founder-photo img').evaluate(e=>getComputedStyle(e).transform);
  const disabled=await page.locator('.akara-story').getAttribute('data-motion');
  await page.setViewportSize({width:1440,height:900});
  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:'output/playwright/about-motion-reduced-1440.png',fullPage:true});
  await page.setViewportSize({width:375,height:812});
  const toggle=page.getByRole('button',{name:'Open menu'});
  await toggle.click();
  await page.keyboard.press('Escape');
  const focusReturned=await toggle.evaluate(e=>document.activeElement===e);
  return {results,reduced,disabled,focusReturned,reveals:await page.locator('.story-revealed').count()};
}
