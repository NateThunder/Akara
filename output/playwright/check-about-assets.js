async page => {
  const results = [];
  for (const width of [320,375,414,767,768,769,1023,1024,1025,1280,1440]) {
    await page.setViewportSize({width,height:900});
    results.push(await page.evaluate(() => ({width:innerWidth,scroll:document.documentElement.scrollWidth,images:[...document.querySelectorAll('.about-journal img')].every(i => i.complete && i.naturalWidth > 0)})));
  }
  await page.screenshot({path:'output/playwright/about-assets-after-1440.png',fullPage:true,animations:'disabled'});
  await page.setViewportSize({width:375,height:812});
  const toggle = page.getByRole('button', {name: 'Open menu'});
  await toggle.click();
  const opened = await page.locator('dialog').evaluate(d => d.open);
  await page.keyboard.press('Escape');
  const returned = await toggle.evaluate(b => document.activeElement === b && b.getAttribute('aria-expanded') === 'false');
  await page.setViewportSize({width:844,height:390});
  results.push(await page.evaluate(() => ({landscape:true,width:innerWidth,scroll:document.documentElement.scrollWidth})));
  return {results,menuOpened:opened,escapeFocusReturned:returned};
}
