async page => {
  await page.emulateMedia({reducedMotion:'no-preference'});
  const section = page.locator('#ueberuns');
  await section.scrollIntoViewIfNeeded();
  return await section.evaluate(root => [...root.querySelectorAll('*')].map(e=>{ const s=getComputedStyle(e);return {tag:e.tagName,classes:e.className,background:s.backgroundImage,attachment:s.backgroundAttachment,position:s.position,transform:s.transform}; }).filter(e=>e.attachment==='fixed'||e.position==='sticky'||e.background!=='none'||e.transform!=='none').slice(0,24));
}
