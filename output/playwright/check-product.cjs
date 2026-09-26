const {spawnSync}=require('node:child_process');
const code=async(page)=>{
 await page.setViewportSize({width:375,height:812});
 await page.goto('http://localhost:3000/shop/gfmothersdaycupcakes');
 const selects=page.locator('.product-options select');
 for(let i=0;i<await selects.count();i++){const s=selects.nth(i);await s.selectOption({index:1});}
 const result={selectors:await selects.count(),price:await page.locator('.product-price').innerText(),orderLink:await page.locator('.product-order-button').getAttribute('href')};
 await page.goto('http://localhost:3000/shop/all?category=Gift+Cards');
 const selected=await page.locator('.shop-categories [aria-pressed="true"]').boundingBox();
 return {...result,selectedCategoryVisible:selected.x>=0&&selected.x+selected.width<=375};
};
const r=spawnSync(process.execPath,['C:/Users/NSome/AppData/Local/npm-cache/_npx/31e32ef8478fbf80/node_modules/@playwright/cli/playwright-cli.js','run-code',code.toString()],{encoding:'utf8'});console.log(r.stdout,r.stderr);
