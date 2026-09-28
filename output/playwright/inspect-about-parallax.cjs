async page => {
  return await page.evaluate(() => {
    const anchor = document.querySelector('#ueberuns');
    const top = anchor ? anchor.getBoundingClientRect().top + scrollY : 0;
    return {anchor: anchor?.outerHTML.slice(0,600), effects: [...document.querySelectorAll('[data-settings]')].map(e=>{
      const s=JSON.parse(e.getAttribute('data-settings'));
      return {tag:e.tagName,text:e.textContent.trim().slice(0,100),top:Math.round(e.getBoundingClientRect().top+scrollY),settings:Object.fromEntries(Object.entries(s).filter(([k])=> /motion_fx|animation/.test(k)))};
    }).filter(e=>Object.keys(e.settings).length && e.top >= top-200 && e.top < top+4200)};
  });
}
