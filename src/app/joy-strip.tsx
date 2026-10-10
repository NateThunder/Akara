"use client";

import { useEffect, useRef, useState } from "react";

const messages = ["Made from scratch", "A little extra love", "Never just a cake", "Always a good idea"];

export default function JoyStrip() {
  const surface = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = surface.current;
    if (!host) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cancelled = false;
    let generation = 0;
    let dispose = () => {};

    async function start() {
      const current = ++generation;
      dispose();
      setReady(false);
      if (preference.matches) return;
      try {
        const [{ Scene, Group, PerspectiveCamera }, { CSS3DRenderer, CSS3DObject }] = await Promise.all([
          import("three"), import("three/addons/renderers/CSS3DRenderer.js"),
        ]);
        await document.fonts.ready;
        if (cancelled || current !== generation) return;
        const slots = messages.map((_, offset) => {
          const slot = document.createElement("div");
          slot.className = "joy-drum-slot";
          host!.appendChild(slot);
          const renderer = new CSS3DRenderer();
          slot.appendChild(renderer.domElement);
          const scene = new Scene();
          const drum = new Group();
          scene.add(drum);
          const camera = new PerspectiveCamera(40, 1, 1, 2000);
          camera.position.z = 620;
          const faces = messages.map((_, index) => {
            const face = document.createElement("div");
            face.className = "joy-drum-face";
            const label = document.createElement("span");
            label.textContent = messages[(index + offset) % messages.length];
            const star = document.createElement("span");
            star.className = "joy-drum-star";
            star.textContent = "✳";
            face.appendChild(label);
            face.appendChild(star);
            const object = new CSS3DObject(face);
            const angle = index * Math.PI / 2;
            object.position.set(0, -Math.sin(angle) * 20, Math.cos(angle) * 20);
            object.rotation.x = angle;
            drum.add(object);
            return face;
          });
          return { slot, renderer, scene, drum, camera, faces };
        });
        const resize = () => slots.forEach(({ slot, renderer, camera, faces, drum }) => {
          const { width, height } = slot.getBoundingClientRect();
          camera.aspect = width / height;
          camera.position.z = 600 + height / 2;
          camera.fov = 2 * Math.atan(height / 1200) * 180 / Math.PI;
          camera.updateProjectionMatrix();
          faces.forEach(face => { face.style.width = `${width}px`; });
          drum.children.forEach((face, index) => {
            const angle = index * Math.PI / 2;
            face.position.set(0, -Math.sin(angle) * height / 2, Math.cos(angle) * height / 2);
          });
          renderer.setSize(width, height);
        });
        const observer = new ResizeObserver(resize);
        observer.observe(host!);
        resize();
        let frame = 0;
        let elapsed = 0;
        let last = 0;
        const render = (time: number) => {
          if (last) elapsed += Math.min(time - last, 64);
          last = time;
          // A readable hold followed by a gentle quarter-turn; hovering never stops it.
          const cycle = elapsed / 4200;
          const turn = Math.min(1, Math.max(0, (cycle % 1 - 0.62) / 0.38));
          const ease = turn * turn * (3 - 2 * turn);
          const rotation = (Math.floor(cycle) + ease) * Math.PI / 2;
          slots.forEach(({ renderer, scene, camera, drum }) => {
            drum.rotation.x = -rotation;
            renderer.render(scene, camera);
          });
          frame = requestAnimationFrame(render);
        };
        const visibility = () => {
          cancelAnimationFrame(frame);
          last = 0;
          if (!document.hidden) frame = requestAnimationFrame(render);
        };
        document.addEventListener("visibilitychange", visibility);
        visibility();
        setReady(true);
        dispose = () => {
          cancelAnimationFrame(frame);
          observer.disconnect();
          document.removeEventListener("visibilitychange", visibility);
          host!.replaceChildren();
        };
      } catch {
        // Keep the original, readable HTML if the optional 3D module cannot load.
        host!.replaceChildren();
      }
    }
    void start();
    preference.addEventListener("change", start);
    return () => {
      cancelled = true;
      generation++;
      preference.removeEventListener("change", start);
      dispose();
    };
  }, []);

  return (
    <div className={`joy-strip-carousel${ready ? " is-ready" : ""}`}>
      <ul className="hero-joy-strip" aria-label="Made with care">
        {messages.map(message => <li key={message}>{message}<span aria-hidden="true">✳</span></li>)}
      </ul>
      <div className="joy-strip-stage" ref={surface} aria-hidden="true" />
    </div>
  );
}
