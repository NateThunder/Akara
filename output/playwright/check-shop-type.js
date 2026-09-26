async page => {
 const assert=(ok,msg)=>{if(!ok)throw Error(msg)};
 const results=[];
 for(const width of [320,375,414,479,480,481,639,640,641,768,1000,1001,1023,1024,1280,1440]){
  await page.setViewportSize({width,height:900});
  const r=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,name:getComputedStyle(document.querySelector('.shop-product-copy h3')).fontSize,price:getComputedStyle(document.querySelector('.shop-product-copy p')).fontSize,smallControls:[...document.querySelectorAll('.shop-categories button,.shop-product-button')].filter(e=>e.getBoundingClientRect().height<44).length,clipped:[...document.querySelectorAll('.shop-product-copy,.shop-product-button,.shop-toolbar')].filter(e=>e.scrollWidth>e.clientWidth+1).length}));
  assert(r.scroll<=width,'Page overflow '+width);assert(r.name==='16px'&&r.price==='16px','Font size '+width);assert(!r.smallControls&&!r.clipped,'Controls '+width);results.push(r);
 }
 await page.setViewportSize({width:844,height:390});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Landscape');
 await page.setViewportSize({width:375,height:900});
 await page.getByRole('button',{name:'Cheesecakes',exact:true}).click();await page.waitForURL('**category=Cheesecakes');
 await page.getByRole('searchbox',{name:'Search products'}).fill('Vanilla');assert(await page.locator('.shop-product').count()===1,'Search');
 await page.getByRole('searchbox',{name:'Search products'}).fill('zzzzzz');await page.getByRole('button',{name:'Clear filters'}).click();await page.waitForURL('**/shop/all');
 await page.getByRole('combobox',{name:'Sort by'}).selectOption('price-low');
 const prices=await page.locator('.shop-product-copy p').allTextContents();const nums=prices.map(p=>Number(p.replace(/[^0-9.]/g,'')));assert(nums.every((n,i)=>!i||n>=nums[i-1]),'Sort');
 const gift=page.getByRole('button',{name:'Gift Cards',exact:true});await gift.focus();await page.keyboard.press('Enter');await page.waitForURL('**category=Gift+Cards');assert(await gift.getAttribute('aria-pressed')==='true','Keyboard category');
 await page.getByRole('button',{name:'All',exact:true}).click();await page.waitForURL('**/shop/all');
 await page.getByRole('combobox',{name:'Sort by'}).selectOption('featured');
 const toggle=page.locator('.menu-toggle');await toggle.click();await page.keyboard.press('Escape');assert(await toggle.evaluate(e=>e===document.activeElement),'Menu focus return');assert(await toggle.getAttribute('aria-expanded')==='false','Menu closed');
 await page.locator('.shop-product-button').first().click();await page.waitForURL(/\/shop\/(?!all)/);assert(await page.locator('.product-information').count()===1,'Product link');
 await page.goto('http://localhost:3000/shop/all');
 return {passed:true,results};
}
