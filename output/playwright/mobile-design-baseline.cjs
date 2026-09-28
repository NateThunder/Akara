async page => {
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.setViewportSize({width:1440,height:900});
 await page.screenshot({path:'output/playwright/mobile-reference-before-desktop.png',fullPage:true});
 return await page.locator('.akara-story').evaluate(e=>[...e.querySelectorAll('section, h1, h2, .story-photo')].map(n=>{const r=n.getBoundingClientRect();return [n.className,r.x,r.y+scrollY,r.width,r.height]}));
}
