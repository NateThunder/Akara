async page => {
  await page.setViewportSize({width:1440,height:900});
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.locator('.story-hero-photo img').first().waitFor();
  await page.screenshot({path:'output/playwright/about-motion-before-1440.png',fullPage:true});
  return {title:await page.title(),url:page.url()};
}
