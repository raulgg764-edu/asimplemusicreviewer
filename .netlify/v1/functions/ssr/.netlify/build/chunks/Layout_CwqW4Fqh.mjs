import { c as createComponent, a as createAstro, d as renderComponent, g as renderHead, b as addAttribute, h as renderSlot, r as renderTemplate } from './astro/server_t4IKgggZ.mjs';
import 'kleur/colors';
import { b as $$ClientRouter } from './utils_EUclcUdp.mjs';
/* empty css                          */
/* empty css                          */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { customTitle, extraClass, color } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>a simple music reviewer: ${customTitle}</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, { "data-astro-cid-sckkx6r4": true })}${renderHead()}</head> <body${addAttribute([
    "w-full min-h-screen flex flex-col items-center bg-myColor",
    extraClass
  ], "class:list")} data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/Raul Garza/Documents/Programming/music-reviews/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
