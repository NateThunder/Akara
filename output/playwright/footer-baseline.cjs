async page => {
 await page.goto('http://localhost:3000/about');
 await page.setViewportSize({width:1440,height:900});
 await page.locator('.site-footer').screenshot({path:'output/playwright/footer-before-desktop.png'});
 return await page.locator('.site-footer').evaluate(e=>({width:e.clientWidth,height:e.clientHeight,columns:getComputedStyle(e.querySelector('.footer-inner')).gridTemplateColumns}));
}
