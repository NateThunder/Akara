const sharp=require('sharp');
(async()=>{
for(const w of [1024,1280,1440]) {
const a=await sharp(`output/playwright/mobile-before-${w}.png`).raw().toBuffer({resolveWithObject:true});
const b=await sharp(`output/playwright/mobile-after-_-${w}.png`).raw().toBuffer({resolveWithObject:true});
let changed=0,box=[w,a.info.height,0,0]; for(let i=0;i<a.data.length;i+=a.info.channels) if(!a.data.subarray(i,i+3).equals(b.data.subarray(i,i+3))) { changed++; const p=i/a.info.channels,x=p%w,y=Math.floor(p/w); box=[Math.min(box[0],x),Math.min(box[1],y),Math.max(box[2],x),Math.max(box[3],y)]; }
console.log(w,{changedPixels:changed,box});
}
await sharp('output/playwright/mobile-after-_-768.png').resize({width:600}).toFile('output/playwright/tablet-preview.png');
await sharp('output/playwright/mobile-after-_shop_all-375.png').extract({left:0,top:0,width:375,height:1500}).toFile('output/playwright/shop-preview.png');
})();
