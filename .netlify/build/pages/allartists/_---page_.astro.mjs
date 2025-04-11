import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, r as renderTemplate, d as renderComponent, e as createTransitionScope } from '../../chunks/astro/server_t4IKgggZ.mjs';
import 'kleur/colors';
import { g as getImageSpotify, a as getCollection, $ as $$NavBar } from '../../chunks/utils_EUclcUdp.mjs';
import { $ as $$Layout } from '../../chunks/Layout_CwqW4Fqh.mjs';
import { $ as $$PaginationButton } from '../../chunks/PaginationButton_Dgu_UO-G.mjs';
import 'clsx';
/* empty css                                     */
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro$2 = createAstro();
const $$ArtistsModal = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ArtistsModal;
  const { releases, artist, img } = Astro2.props;
  const artistID = artist.replaceAll(" ", "");
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col md:flex-row bg-black w-full relative md:overflow-y-auto md:h-full text-white"> <img${addAttribute(img, "src")} class="object-cover"> <div class="flex flex-col items-center justify-center overflow-hidden px-1 w-full"> <div class="flex md:h-1/2 items-center "> <h2 class="text-2xl md:text-4xl font-bold py-6">${artist}</h2> </div> <div class="md:h-1/2 flex flex-col items-center w-full md:overflow-y-auto"> <h3 class="py-3 text-2xl font-semibold self-center">Releases</h3> <ul> ${releases.map((rel) => {
    return renderTemplate`<li class="py-10"> <a class="select-none group px-4 flex w-full items-center transition-all hover:underline hover:text-white hover:font-semibold"${addAttribute(`../reviews/${rel.id}`, "href")}> ${rel.data.title} </a> </li>`;
  })} </ul> </div> </div> <form> <button${addAttribute(`window.modal${artistID}.close()`, "onclick")} class="w-10 h-10 font-bold absolute top-0 right-0 text-2xl items-center bg-white m-2 rounded-full text-black cursor-pointer select-none">×</button> </form> </div>`;
}, "C:/Users/Raul Garza/Documents/Programming/music-reviews/src/components/ArtistsModal.astro", void 0);

const $$Astro$1 = createAstro();
const $$ArtistItem = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ArtistItem;
  const { artist, reviews } = Astro2.props;
  const getArtistReleases = (artist2) => {
    return reviews.filter(
      (release) => release.data.artists.includes(artist2)
    );
  };
  const artistReleases = getArtistReleases(artist);
  const artistID = artist.replaceAll(" ", "");
  const artistImg = await getImageSpotify(artistID, "search");
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(`w-full h-full group transition-all ease-in-out transform text-white bg-zinc-900`, "class")}${addAttribute(`window.modal${artistID}.showModal()`, "onclick")} data-astro-cid-6fzb5h4f> <div class="relative list-none hover:cursor-pointer select-none font-bold flex justify-between h-full w-full" data-astro-cid-6fzb5h4f> <img class="flex object-cover w-full"${addAttribute(artistImg, "src")} data-astro-cid-6fzb5h4f> <div class="absolute z-1 bottom-0 group-hover:top-0 transition-all duration-200 text-white flex items-start w-full  shadow-[inset_0px_-100px_0px_0px_black] group-hover:shadow-[inset_0px_-800px_0px_0px_black]" data-astro-cid-6fzb5h4f> <p class="line-clamp-1 h-full  px-4 py-4 text-2xl w-full text-white group-hover:text-emerald-400 duration-500 ease-in-out transition-all" data-astro-cid-6fzb5h4f> ${artist} </p> </div> </div> <dialog${addAttribute(`modal${artistID}`, "id")} class="backdrop:bg-black/80 w-full xl:w-3/4 xl:h-3/4 rounded-2xl" data-astro-cid-6fzb5h4f> ${renderComponent($$result, "ArtistsModal", $$ArtistsModal, { "artist": artist, "releases": artistReleases, "img": artistImg, "data-astro-cid-6fzb5h4f": true })} </dialog> </article> `;
}, "C:/Users/Raul Garza/Documents/Programming/music-reviews/src/components/ArtistItem.astro", void 0);

const $$Astro = createAstro();
const prerender = false;
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const reviews = await getCollection("reviews");
  const sortedReviews = reviews.sort((a, b) => new Date(b.data.releaseDate).getTime() - new Date(a.data.releaseDate).getTime());
  const artists = [...new Set(sortedReviews.map((val) => {
    return val.data.artists;
  }).flat())].sort((a, b) => a.localeCompare(b));
  const artistsPerPage = 8;
  const url = new URL(Astro2.request.url);
  const currentPage = Number(url.searchParams.get("page") || 1);
  const totalArtists = artists.length;
  const totalPages = Math.ceil(totalArtists / artistsPerPage);
  const startIndex = (currentPage - 1) * artistsPerPage;
  const endIndex = Math.min(startIndex + artistsPerPage, totalArtists);
  const currentArtists = artists.slice(startIndex, endIndex);
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "customTitle": "all the artists", "extraClass": "md:justify-between py-20 bg-emerald-400" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "NavBar", $$NavBar, { "data-astro-transition-persist": createTransitionScope($$result2, "ofaqo6zb") })} ${maybeRenderHead()}<div class="grid md:h-full md:grid-cols-4 items-start gap-4 px-8 md:px-16 w-full grid-rows-2"> ${currentArtists.map(
    (artist) => renderTemplate`${renderComponent($$result2, "ArtistItem", $$ArtistItem, { "artist": artist, "reviews": sortedReviews })}`
  )} </div> <div class="pt-8"> ${renderComponent($$result2, "PaginationButton", $$PaginationButton, { "prevPage": prevPage, "nextPage": nextPage })} </div> ` })}`;
}, "C:/Users/Raul Garza/Documents/Programming/music-reviews/src/pages/allartists/[...page].astro", "self");

const $$file = "C:/Users/Raul Garza/Documents/Programming/music-reviews/src/pages/allartists/[...page].astro";
const $$url = "/allartists/[...page]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
