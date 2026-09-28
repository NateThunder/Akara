async page => {
  await page.getByRole('button', {name: 'Ablehnen', exact: true}).click();
  const settings = await page.evaluate(() => [...document.querySelectorAll('[data-settings]')].map(e => ({classes:e.className,settings:e.getAttribute('data-settings')})).filter(e=>/animation|motion|parallax/.test(e.settings)).slice(0,30));
  await page.screenshot({path:'output/playwright/welling-motion-reference.png'});
  return settings;
}
