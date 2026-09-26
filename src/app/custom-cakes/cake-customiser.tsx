"use client";

import { useEffect, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";

// Sample prices only. Replace with the bakery's confirmed price list before ordering goes live.
const flavours = [
  { name: "Vanilla Sponge", crumb: "#e6bb78", icing: "#fff6df", price: 0 },
  { name: "Chocolate Sponge", crumb: "#684029", icing: "#a46e49", price: 5 },
  { name: "Red Velvet", crumb: "#943f3b", icing: "#fff2dc", price: 5 },
  { name: "Lemon Sponge", crumb: "#eac96e", icing: "#fff9db", price: 3 },
  { name: "Carrot Cake", crumb: "#ac713d", icing: "#fff2dc", price: 5 },
];
const sizes = [{ inches: 6, serves: 10, price: 85 }, { inches: 8, serves: 20, price: 110 }, { inches: 10, serves: 30, price: 140 }, { inches: 12, serves: 40, price: 170 }];
const colours = [{ name: "Ivory", colour: "#fffaf0" }, { name: "Blush", colour: "#dca29c" }, { name: "Sage", colour: "#87956c" }, { name: "Dusty blue", colour: "#8197ac" }, { name: "Oatmeal", colour: "#caa77c" }, { name: "Terracotta", colour: "#a65635" }, { name: "Charcoal", colour: "#373735" }];
const extras = [{ name: "Candles", price: 3, icon: "candle" }, { name: "Flowers", price: 15, icon: "flower" }, { name: "Fruit", price: 8, icon: "fruit" }, { name: "Sprinkles", price: 4, icon: "sprinkles" }];
const money = (value: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value);
const storageKey = "akara-custom-cake-v1";
type Selection = { flavour: number; size: number; colour: number; writing: string; message: string; extras: string[]; delivery: string; date: string; time: string };
const initial: Selection = { flavour: 0, size: 0, colour: 0, writing: "Hand piped", message: "", extras: [], delivery: "Collection", date: "", time: "" };
const timeSlots = ["10:00–12:00", "12:00–14:00", "14:00–16:00"];

function Icon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    candle: "M10 10h4v12h-4zM12 2c-4 5-2 6 0 6s4-1 0-6ZM12 12v7",
    flower: "M12 8c-7-10-12 1-5 4-8 5 1 12 5 5 4 7 13 0 5-5 7-3 2-14-5-4ZM12 17v6m0-3 6-2",
    fruit: "M12 7C3 4 2 12 6 19c4 7 8 2 12-4 4-7-1-10-6-8ZM12 7V2m0 5 5-4M8 11h.1m6 0h.1m-4 4h.1m5 0h.1",
    sprinkles: "m4 8 2-2m6-3 1 3m6 2 2 1M3 16l3 1m5-6-1 3m7 1 2 2m-8 2 1 3m-7-1 1 2m13-1 2-1",
    collection: "M3 10h18L19 3H5l-2 7ZM4 10v12h16V10M9 22v-8h6v8M8 3l-1 7m9-7 1 7M3 10c0 4 5 4 5 0 0 4 8 4 8 0 0 4 5 4 5 0",
    delivery: "M2 4h13v14H2V4Zm13 5h4l3 5v4h-7M6 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm12 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    cake: "M3 22h18M5 22V12h14v10M5 16c2 3 3-3 5 0s3-3 5 0 3-2 4 0M8 12V8m4 4V6m4 6V8M8 5V3m4 0V1m4 4V3",
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={paths[name] || paths.cake} /></svg>;
}

function Slice({ crumb, icing }: { crumb: string; icing: string }) {
  return <svg className="custom-cake-slice" viewBox="0 0 120 96" aria-hidden="true">
    <ellipse cx="61" cy="85" rx="44" ry="5" fill="#e8dfd0" />
    <path d="M23 30 78 18l19 17v44L42 89 23 72Z" fill={crumb} />
    <path d="m23 30 55-12 19 17-55 13Z" fill={icing} />
    <path d="m24 43 18 15 54-12v7L42 66 24 51Zm0 18 18 15 54-12v7L42 84 24 69Z" fill={icing} />
    <path d="m42 48 55-13v44L42 89Z" fill="#422a16" opacity=".09" />
    <path d="m32 28 8-2m7-2 8-2m7-1 8-2" stroke="#fffaf0" strokeWidth="5" strokeLinecap="round" />
    <path d="m49 53 2-1m15 1 2-1m13-9 2-1M49 72l2-1m25 4 2-1" stroke={icing} strokeWidth="2" opacity=".65" />
  </svg>;
}

function Step({ number, title, hint, children }: { number: number; title: string; hint: string; children: ReactNode }) {
  return <fieldset className="custom-step"><legend><span className="custom-step-number">{number}</span><span>{title}</span></legend><p className="custom-step-hint">{hint}</p>{children}</fieldset>;
}

function validSaved(value: unknown): value is Selection {
  if (!value || typeof value !== "object") return false;
  const s = value as Selection;
  return Number.isInteger(s.flavour) && !!flavours[s.flavour] && Number.isInteger(s.size) && !!sizes[s.size] && Number.isInteger(s.colour) && !!colours[s.colour]
    && ["Hand piped", "Handwritten"].includes(s.writing) && typeof s.message === "string" && s.message.length <= 30
    && Array.isArray(s.extras) && s.extras.every(name => extras.some(extra => extra.name === name))
    && ["Collection", "Local delivery"].includes(s.delivery) && typeof s.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s.date) && timeSlots.includes(s.time);
}

export default function CakeCustomiser() {
  const [selection, setSelection] = useState<Selection>(initial);
  const [status, setStatus] = useState("");
  const [minDate, setMinDate] = useState("");
  useEffect(() => {
    const earliest = new Date();
    earliest.setDate(earliest.getDate() + 4);
    setMinDate(`${earliest.getFullYear()}-${String(earliest.getMonth() + 1).padStart(2, "0")}-${String(earliest.getDate()).padStart(2, "0")}`);
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const saved: unknown = JSON.parse(stored);
        if (validSaved(saved)) { setSelection(saved); setStatus("Your saved cake has been restored. You can keep editing below."); }
      }
    } catch { setStatus("Browser storage is unavailable. You can still customise your cake."); }
  }, []);
  function update<K extends keyof Selection>(key: K, value: Selection[K]) {
    setSelection(previous => ({ ...previous, [key]: value }));
    setStatus("");
  }
  const flavour = flavours[selection.flavour];
  const size = sizes[selection.size];
  const total = size.price + flavour.price + extras.filter(extra => selection.extras.includes(extra.name)).reduce((sum, extra) => sum + extra.price, 0) + (selection.delivery === "Local delivery" ? 4 : 0);
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try { localStorage.setItem(storageKey, JSON.stringify(selection)); setStatus("Your cake is saved in this browser. No order has been placed."); }
    catch { setStatus("Your browser could not save this cake. Please allow local storage and try again."); }
  }
  return <form className="custom-cake-form" onSubmit={save}>
    <div className="custom-cake-steps">
      <Step number={1} title="Cake flavour" hint="Choose your favourite flavour.">
        <div className="custom-flavours">{flavours.map((item, index) => <label className="custom-choice custom-flavour" key={item.name}>
          <input type="radio" name="flavour" checked={selection.flavour === index} onChange={() => update("flavour", index)} />
          <span className="custom-choice-face"><Slice {...item} /><strong>{item.name}</strong><small>{item.price ? `+${money(item.price)}` : "Included"}</small></span>
        </label>)}</div>
      </Step>
      <Step number={2} title="Size" hint="Select the perfect size.">
        <div className="custom-sizes">{sizes.map((item, index) => <label className="custom-choice" key={item.inches}><input type="radio" name="size" checked={selection.size === index} onChange={() => update("size", index)} /><span className="custom-choice-face"><strong>{item.inches}″</strong><span>Serves {item.serves}</span><small>{money(item.price)}</small></span></label>)}</div>
      </Step>
      <Step number={3} title="Colour theme" hint={`Pick your perfect colour. ${colours[selection.colour].name} selected · included.`}>
        <div className="custom-colours">{colours.map((item, index) => <label className="custom-colour" key={item.name} style={{ "--cake-swatch": item.colour } as CSSProperties}><input type="radio" name="colour" checked={selection.colour === index} onChange={() => update("colour", index)} /><span className="custom-swatch" /><span>{item.name}</span></label>)}</div>
      </Step>
      <Step number={4} title="Personalisation" hint="Add your personal touches.">
        <div className="custom-personalisation">
          <div className="custom-personalisation-top">
            <fieldset className="custom-writing"><legend>Writing style</legend><div>{["Hand piped", "Handwritten"].map(item => <label className="custom-choice" key={item}><input type="radio" name="writing" checked={selection.writing === item} onChange={() => update("writing", item)} /><span className="custom-choice-face">{item}</span></label>)}</div></fieldset>
            <label className="custom-field">Message (optional)<span className="custom-message"><input name="message" maxLength={30} placeholder="e.g. Happy Birthday Akara!" value={selection.message} onChange={event => update("message", event.target.value)} /><span aria-hidden="true">{selection.message.length}/30</span></span></label>
          </div>
          <fieldset className="custom-extras"><legend>Add extras <span>(choose as many as you like)</span></legend><div>{extras.map(item => <label className="custom-choice" key={item.name}><input type="checkbox" name="extras" value={item.name} checked={selection.extras.includes(item.name)} onChange={event => update("extras", event.target.checked ? [...selection.extras, item.name] : selection.extras.filter(name => name !== item.name))} /><span className="custom-choice-face"><Icon name={item.icon} /><span>{item.name}</span><small>+{money(item.price)}</small></span></label>)}</div></fieldset>
          <p className="custom-decoration-note"><Icon name="cake" />Your {size.inches}″ cake will be decorated to suit the size.</p>
        </div>
      </Step>
      <Step number={5} title="Delivery or collection" hint="Choose when and how you’d like your cake.">
        <div className="custom-delivery">{["Collection", "Local delivery"].map(item => <label className="custom-choice" key={item}><input type="radio" name="delivery" checked={selection.delivery === item} onChange={() => update("delivery", item)} /><span className="custom-choice-face"><Icon name={item === "Collection" ? "collection" : "delivery"} /><span><strong>{item}</strong><small>{item === "Collection" ? "Collect from Akara Bakery · free" : "+£4.00 sample delivery fee"}</small></span></span></label>)}</div>
        <div className="custom-schedule"><label className="custom-field">Preferred date<input aria-label="Preferred date" type="date" required min={minDate} value={selection.date} onChange={event => update("date", event.target.value)} /></label><label className="custom-field">Preferred time<select required value={selection.time} onChange={event => update("time", event.target.value)}><option value="">Select time</option>{timeSlots.map(time => <option key={time}>{time}</option>)}</select></label></div>
        <p className="custom-availability">Please allow at least 4 days. Dates, time slots and delivery availability need to be confirmed with the bakery.</p>
      </Step>
    </div>
    <section className="custom-summary" aria-labelledby="custom-summary-title">
      <div className="custom-summary-cake"><img src="/Video/Banner Carosel/banner-5.webp" alt="Floral buttercream cake inspiration" width={160} height={160} /><div><h2 id="custom-summary-title">Your cake</h2><p>{flavour.name} · {size.inches}″ (serves {size.serves})</p><p>{colours[selection.colour].name} · {selection.writing}</p>{selection.message && <p>“{selection.message}”</p>}<p>{selection.extras.length ? selection.extras.join(" · ") : "No extras"}</p><p>{selection.delivery}{selection.date && ` · ${selection.date}`}{selection.time && ` · ${selection.time}`}</p><small>Photo for inspiration; your cake will be made to your choices.</small></div></div>
      <div className="custom-summary-action"><div className="custom-total" aria-live="polite" aria-atomic="true"><span>Sample total</span><strong>{money(total)}</strong></div><button type="submit">Save my cake <span aria-hidden="true">→</span></button></div>
      <p className="custom-pricing-note">Sample prices for planning only. Save your selection on this device; this does not place an order.</p>
      <p className="custom-save-status" role="status">{status}</p>
    </section>
  </form>;
}
