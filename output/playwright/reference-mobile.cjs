async page => {
 await page.setViewportSize({width:375,height:812});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.locator('#ueberuns').scrollIntoViewIfNeeded();
 await page.screenshot({path:'output/playwright/reference-mobile-about.png'});
 await page.locator('#ueberuns').screenshot({path:'output/playwright/reference-mobile-chapter.png'});
 return await page.locator('#ueberuns').evaluate(e=>({width:e.clientWidth,height:e.clientHeight,text:e.innerText}));
}
