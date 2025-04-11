import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, r as renderTemplate } from './astro/server_t4IKgggZ.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$PaginationButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PaginationButton;
  const { prevPage, nextPage } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex gap-4 font-bold"> ${prevPage && renderTemplate`<a${addAttribute(`?page=${prevPage}`, "href")} class="px-4 hover:bg-white bg-black rounded-full  hover:text-black text-white transition-colors">
Previous
</a>`} ${nextPage && renderTemplate`<a${addAttribute(`?page=${nextPage}`, "href")} class="px-4 hover:bg-white bg-black rounded-full  hover:text-black text-white transition-colors">
Next
</a>`} </div>`;
}, "C:/Users/Raul Garza/Documents/Programming/music-reviews/src/components/PaginationButton.astro", void 0);

export { $$PaginationButton as $ };
