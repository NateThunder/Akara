async page => {
 const assert = (ok, text) => { if (!ok) throw new Error(text); };
 await page.getByRole('button',{name:'Cheesecakes',exact:true}).click();
 await page.waitForURL('**/shop/all?category=Cheesecakes');
 await page.getByRole('status').filter({hasText:'5 products'}).waitFor();
 assert(await page.locator('.shop-product').count() === 5, 'Five cheesecakes');
 await page.getByRole('searchbox',{name:'Search products'}).fill('Vanilla');
 assert(await page.locator('.shop-product').count() === 1, 'Search filters cheesecakes');
 await page.getByRole('searchbox',{name:'Search products'}).fill('');
 await page.getByRole('combobox',{name:'Sort by'}).selectOption('price-low');
 assert((await page.locator('.shop-product h3').first().innerText()).includes('Vanilla'), 'Price sort');
 const sizes=[];
 for (const width of [320,375,414,768,1023,1024,1025,1280,1440]) {
  await page.setViewportSize({width,height:900});
  const dimensions=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
  assert(dimensions.scroll<=width, 'Overflow at '+width);
  sizes.push(dimensions);
  if ([375,768,1440].includes(width)) await page.screenshot({path:'output/playwright/cheesecake-filter-'+width+'.png'});
 }
 await page.setViewportSize({width:844,height:390});
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth), 'Landscape overflow');
 await page.setViewportSize({width:375,height:812});
 const cheese=page.getByRole('button',{name:'Cheesecakes',exact:true});
 await page.getByRole('button',{name:'Cakes',exact:true}).click();
 await page.waitForURL('**/shop/all?category=Cakes');
 assert(await page.locator('.shop-product h3').filter({hasText:'Cheesecake'}).count()===5, 'Cakes retains cheesecakes');
 await cheese.focus(); await page.keyboard.press('Enter');
 await page.waitForURL('**/shop/all?category=Cheesecakes');
 assert(await cheese.getAttribute('aria-pressed')==='true', 'Keyboard selection');
 await page.reload();
 await page.getByRole('status').filter({hasText:'5 products'}).waitFor();
 await page.getByRole('button',{name:'All',exact:true}).click();
 await page.waitForURL('**/shop/all');
 assert(await page.locator('.shop-product').count()===58, 'All retains products');
 return {passed:true,sizes};
}
