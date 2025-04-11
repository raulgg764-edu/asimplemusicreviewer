import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, f as renderTransition, r as renderTemplate, d as renderComponent, e as createTransitionScope } from '../../chunks/astro/server_t4IKgggZ.mjs';
import 'kleur/colors';
import { g as getImageSpotify, a as getCollection, $ as $$NavBar } from '../../chunks/utils_EUclcUdp.mjs';
import { $ as $$Layout } from '../../chunks/Layout_CwqW4Fqh.mjs';
import 'clsx';
/* empty css                                     */
/* empty css                                    */
import { $ as $$PaginationButton } from '../../chunks/PaginationButton_Dgu_UO-G.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro();
const $$ReleaseItem = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ReleaseItem;
  const { review } = Astro2.props;
  const dateRelease = new Date(review.data.releaseDate).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric"
    }
  );
  const dateReviewed = new Date(review.data.reviewDate).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric"
    }
  );
  const spotifyID = review.data.spotifyUrl.split("/")[5].split("?")[0];
  const spotifyImg = await getImageSpotify(spotifyID, "id");
  const img = spotifyImg ? spotifyImg : review.data.img;
  const colorMain = review.data.color;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`../reviews/${review.id}`, "href")}${addAttribute(`card h-full group transition-all ease-in-out transform w-full px-4 md:px-8 py-4 text-black font-bold`, "class")}${addAttribute(`--colorcard: ${colorMain}; background-color: ${colorMain}`, "style")} data-astro-cid-4jjfgoai> <article class="flex flex-row w-full items-center justify-between" data-astro-cid-4jjfgoai> <div class="flex flex-col w-6/12 md:w-10/12" data-astro-cid-4jjfgoai> <h2 class="text-2xl line-clamp-2 md:text-3xl" data-astro-cid-4jjfgoai${addAttribute(renderTransition($$result, "zbouvl2y", "", `title-${review.id}`), "data-astro-transition-scope")}>${review.data.title}</h2> <p class="text-lg font-thin line-clamp-1" data-astro-cid-4jjfgoai${addAttribute(renderTransition($$result, "p5id7tf4", "", `artists-${review.id}`), "data-astro-transition-scope")}> ${review.data.artists.join(", ")} </p><p data-astro-cid-4jjfgoai></p> <p class="capitalize" data-astro-cid-4jjfgoai>${review.data.type}</p> <div class="flex gap-2" data-astro-cid-4jjfgoai> <p data-astro-cid-4jjfgoai>${dateRelease}</p> <span data-astro-cid-4jjfgoai>·</span> <p data-astro-cid-4jjfgoai>Reviewed on ${dateReviewed}</p> </div> </div> <div class="flex flex-row" data-astro-cid-4jjfgoai> <img${addAttribute(img, "src")} class="w-36" data-astro-cid-4jjfgoai${addAttribute(renderTransition($$result, "pwxvw2lq", "", `image-${review.id}`), "data-astro-transition-scope")}> </div> </article>  </a>`;
}, "C:/Users/Raul Garza/Documents/Programming/music-reviews/src/components/ReleaseItem.astro", "self");

const $$Astro = createAstro();
const prerender = false;
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const reviews = await getCollection("reviews");
  const sortedReviews = reviews.sort((a, b) => new Date(b.data.reviewDate).getTime() - new Date(a.data.reviewDate).getTime());
  const releasePerPage = 20;
  const url = new URL(Astro2.request.url);
  const currentPage = Number(url.searchParams.get("page") || 1);
  const totalReleases = sortedReviews.length;
  const totalPages = Math.ceil(totalReleases / releasePerPage);
  const startIndex = (currentPage - 1) * releasePerPage;
  const endIndex = Math.min(startIndex + releasePerPage, totalReleases);
  const currentReleases = sortedReviews.slice(startIndex, endIndex);
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "customTitle": "all the releases", "extraClass": "md:justify-start py-20 bg-black" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "NavBar", $$NavBar, { "data-astro-transition-persist": createTransitionScope($$result2, "rh4eetux") })} ${maybeRenderHead()}<div class="grid md:grid-cols-2 items-start justify-start gap-4 px-8 md:px-16 pb-8 w-full"> ${currentReleases.map(
    (review) => renderTemplate`${renderComponent($$result2, "ReleaseItem", $$ReleaseItem, { "review": review })}`
  )} </div> ${renderComponent($$result2, "PaginationButton", $$PaginationButton, { "prevPage": prevPage, "nextPage": nextPage })} ` })}`;
}, "C:/Users/Raul Garza/Documents/Programming/music-reviews/src/pages/allreleases/[...page].astro", "self");

const $$file = "C:/Users/Raul Garza/Documents/Programming/music-reviews/src/pages/allreleases/[...page].astro";
const $$url = "/allreleases/[...page]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
