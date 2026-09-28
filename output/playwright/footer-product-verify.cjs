async page => {
 await page.setViewportSize({width:375,height:812});
 const footer=page.locator('.site-footer');
 await footer.scrollIntoViewIfNeeded();
 const mobile=await footer.evaluate(e=>({columns:getComputedStyle(e.querySelector('.footer-inner')).gridTemplateColumns,overflow:document.documentElement.scrollWidth>innerWidth}));
 await page.setViewportSize({width:844,height:390});
 return {mobile,landscapeOverflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)};
}
