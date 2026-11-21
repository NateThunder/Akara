async (page) => {
  await page.goto('http://localhost:3000/custom-cakes');
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.evaluate(()=>localStorage.removeItem('akara-custom-cake-v2'));
  await page.reload();
  const standard=page.locator('.custom-categories input[name=category]').first();
  const vegan=page.locator('.custom-categories input[name=category]').last();
  const gf=page.locator('.custom-categories input[name=glutenFree]');
  const select = text=>page.locator('.custom-categories label').filter({hasText:text}).click();
  const count=async n=>{if(await page.locator('.custom-flavour').count()!==n)throw Error('Flavour count '+n)};
  const total=()=>page.locator('.custom-total strong').textContent();
  await count(10);
  await select('Gluten-Free'); await count(8);
  if(!await standard.isChecked()||!await gf.isChecked()) throw Error('Standard + GF');
  if(await total()!=='£90.00') throw Error('GF pricing');
  await select('Vegan'); await count(0);
  if(await standard.isChecked()||!await gf.isChecked()||!await vegan.isChecked()) throw Error('Vegan + GF');
  if(!await page.getByRole('button',{name:'Save my cake'}).isDisabled()||await total()!=='Coming soon') throw Error('Combined placeholder');
  await page.screenshot({path:'output/playwright/cake-combination-empty.png',fullPage:true});
  await select('Standard'); await count(8);
  if(await vegan.isChecked()||!await gf.isChecked()) throw Error('Standard did not replace Vegan');
  await select('Gluten-Free'); await count(10);
  if(await total()!=='£85.00') throw Error('Standard pricing');
  await select('Vegan'); await count(8);
  for(const [size,expected] of [[4,'On enquiry'],[6,'£90.00'],[8,'£115.00'],[10,'£147.00']]){
    await page.locator('.custom-sizes label').filter({hasText:`${size}″`}).click();
    if(await total()!==expected)throw Error('Vegan price '+size);
  }
  await vegan.focus(); await page.keyboard.press('ArrowLeft');
  if(!await standard.isChecked())throw Error('Radio keyboard');
  await gf.focus(); await page.keyboard.press('Space');
  if(!await gf.isChecked())throw Error('GF keyboard');
  await page.locator('.custom-inscription').click();
  await page.locator('input[name=message]').fill('Test inscription');
  const date=page.getByLabel('Preferred date'); await date.fill(await date.getAttribute('min'));
  await page.getByLabel('Preferred time').selectOption({index:1});
  await page.getByRole('button',{name:'Save my cake'}).click(); await page.reload();
  await page.locator('.custom-save-status').filter({hasText:'restored'}).waitFor();
  if(!await standard.isChecked()||!await gf.isChecked()||await total()!=='£150.50')throw Error('Restore combination');
  for(const width of [320,374,375,414,699,700,768,1023,1024,1280,1440]) {
    await page.setViewportSize({width,height:900});
    if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow '+width);
    if([375,768,1440].includes(width))await page.screenshot({path:`output/playwright/cake-combination-${width}.png`,fullPage:true});
  }
  await page.setViewportSize({width:844,height:390});
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Landscape');
  // Exercise compatibility with the previous single-category saved format.
  await page.evaluate(()=>{const old=JSON.parse(localStorage.getItem('akara-custom-cake-v2'));delete old.glutenFree;old.category='gf';localStorage.setItem('akara-custom-cake-v2',JSON.stringify(old));});
  await page.reload(); await page.locator('.custom-save-status').filter({hasText:'restored'}).waitFor();
  if(!await gf.isChecked()||!await standard.isChecked())throw Error('Old save migration');
  if(errors.length)throw Error(errors.join('\n'));
  return {combinations:'passed',exclusivity:'passed',pricing:'passed',emptyMenu:'passed',keyboard:'passed',saveRestore:'passed',oldSaveMigration:'passed',responsive:'320–1440 + landscape passed',pageErrors:errors};
}
