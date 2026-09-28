async page => {
  await page.setViewportSize({width:1440,height:900});
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('http://localhost:3000/about');
  await page.locator('.akara-story[data-motion="enabled"]').waitFor();
  await page.locator('#story-today-heading').scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  const reveal=await page.locator('#story-today-heading').evaluate(e=>({class:e.className,animation:getComputedStyle(e).animationName,opacity:getComputedStyle(e).opacity}));
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(()=>!document.querySelector('.akara-story').hasAttribute('data-motion'));
  const reduced=await page.locator('#story-today-heading').evaluate(e=>({animation:getComputedStyle(e).animationName,opacity:getComputedStyle(e).opacity}));
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.evaluate(()=>scrollTo(0,0));
  return {reveal,reduced};
}
