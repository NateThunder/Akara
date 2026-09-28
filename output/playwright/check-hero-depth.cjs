async page => {
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('http://localhost:3000/about');
  const results=[];
  for (const width of [320,375,414,768,1024,1280,1440]) {
    await page.setViewportSize({width,height:900});
    const hero=page.locator('.story-hero-photo');
    await hero.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
    const sample=()=>hero.evaluate(e=>({photo:getComputedStyle(e.querySelector('img')).transform,wordmark:getComputedStyle(e.querySelector('.story-wordmark')).transform,drift:parseFloat(e.style.getPropertyValue('--story-drift')),overflow:document.documentElement.scrollWidth>innerWidth}));
    const before=await sample();
    await page.mouse.wheel(0,250);
    await page.waitForTimeout(300);
    const after=await sample();
    results.push({width,before,after});
  }
  for (const width of [375,768,1440]) {
    await page.setViewportSize({width,height:900});
    await page.locator('.story-hero-photo').scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
    await page.locator('.story-hero-photo').screenshot({path:`output/playwright/hero-dramatic-${width}.png`});
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(()=>!document.querySelector('.akara-story').hasAttribute('data-motion'));
  const reduced=await page.locator('.story-hero-photo').evaluate(e=>[...e.querySelectorAll('img')].map(i=>getComputedStyle(i).transform));
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.evaluate(()=>scrollTo(0,0));
  return {results,reduced};
}
