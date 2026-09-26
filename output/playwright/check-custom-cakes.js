async (page) => {
  const results = [];
  for (const width of [320, 375, 414, 699, 700, 768, 1023, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    if (overflow) throw new Error(`Overflow at ${width}`);
    if ([375, 768, 1440].includes(width)) await page.screenshot({ path: `output/playwright/custom-cakes-${width}.png`, fullPage: true });
    results.push(`${width}: no overflow`);
  }
  await page.setViewportSize({ width: 844, height: 390 });
  if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw new Error('Landscape overflow');
  await page.getByText('Chocolate Sponge', {exact:true}).click();
  await page.getByText('Serves 20', {exact:true}).click();
  await page.getByText('Blush', {exact:true}).click();
  await page.getByText('Flowers', {exact:true}).click();
  await page.getByText('Candles', {exact:true}).click();
  await page.getByText('Local delivery', {exact:true}).click();
  await page.getByText('Handwritten', {exact:true}).click();
  await page.getByRole('textbox', {name:'Message (optional)'}).fill('Happy Birthday Akara!');
  if (await page.locator('.custom-total strong').textContent() !== '£137.00') throw new Error('Total calculation failed');
  await page.getByRole('button', {name:'Save my cake'}).click();
  if (await page.locator('input[type=date]').evaluate(el => el.validity.valid)) throw new Error('Missing date not rejected');
  const date = page.getByLabel('Preferred date');
  await date.fill('2020-01-01');
  if (await date.evaluate(el => el.validity.valid)) throw new Error('Past date accepted');
  await date.fill(await date.getAttribute('min'));
  await page.getByRole('combobox', {name:'Preferred time'}).selectOption({index:1});
  await page.getByRole('button', {name:'Save my cake'}).click();
  if (!(await page.getByRole('status').textContent()).includes('saved in this browser')) throw new Error('Save failed');
  await page.reload();
  await page.getByRole('status').filter({hasText:'restored'}).waitFor();
  if (await page.locator('.custom-total strong').textContent() !== '£137.00') throw new Error('Restored price differs');
  await page.getByRole('radio', {name:'Blush',exact:true}).focus();
  await page.keyboard.press('ArrowRight');
  if (!(await page.getByRole('radio', {name:'Sage',exact:true}).isChecked())) throw new Error('Radio keyboard failed');
  await page.getByText('Flowers', {exact:true}).click();
  if (await page.locator('.custom-total strong').textContent() !== '£122.00') throw new Error('Removing extra failed');
  await page.evaluate(() => localStorage.removeItem('akara-custom-cake-v1'));
  await page.reload();
  await page.setViewportSize({width:1440,height:900});
  await page.goto('http://localhost:3000/');
  await page.screenshot({path:'output/playwright/custom-after-home.png'});
  console.log(JSON.stringify({widths:results,landscape:'passed',pricing:'passed',validation:'passed',saveAndRestore:'passed',keyboard:'passed'}));
}
