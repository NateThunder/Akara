async (page) => {
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const [name,width] of [['phone',375],['tablet',768]]) {
 await page.setViewportSize({width,height:900});
 await page.screenshot({path:'output/playwright/grain-final-'+name+'.png',fullPage:true,animations:'disabled'});
 }
 return await page.locator('.site-footer').evaluate(e=>getComputedStyle(e).backgroundImage);
}
