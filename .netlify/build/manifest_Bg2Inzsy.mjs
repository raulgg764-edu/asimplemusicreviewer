import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_HEADER, n as decodeKey } from './chunks/astro/server_Bx8Ilaji.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Raul%20Garza/Documents/Programming/music-reviews/","cacheDir":"file:///C:/Users/Raul%20Garza/Documents/Programming/music-reviews/node_modules/.astro/","outDir":"file:///C:/Users/Raul%20Garza/Documents/Programming/music-reviews/dist/","srcDir":"file:///C:/Users/Raul%20Garza/Documents/Programming/music-reviews/src/","publicDir":"file:///C:/Users/Raul%20Garza/Documents/Programming/music-reviews/public/","buildClientDir":"file:///C:/Users/Raul%20Garza/Documents/Programming/music-reviews/dist/","buildServerDir":"file:///C:/Users/Raul%20Garza/Documents/Programming/music-reviews/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Raul Garza/Documents/Programming/music-reviews/src/pages/allartists/[...page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/allartists/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Users/Raul Garza/Documents/Programming/music-reviews/src/components/ReleaseItem.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Raul Garza/Documents/Programming/music-reviews/src/pages/allreleases/[...page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/allreleases/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Raul Garza/Documents/Programming/music-reviews/src/pages/reviews/[...id].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/Raul Garza/Documents/Programming/music-reviews/src/layouts/Review.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/reviews/[...id]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Raul Garza/Documents/Programming/music-reviews/src/components/Block.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Raul Garza/Documents/Programming/music-reviews/src/components/Home.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Raul Garza/Documents/Programming/music-reviews/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/Raul Garza/Documents/Programming/music-reviews/src/components/ArtistItem.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/Raul Garza/Documents/Programming/music-reviews/src/utils.js",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/allartists/[...page]@_@astro":"pages/allartists/_---page_.astro.mjs","\u0000@astro-page:src/pages/allreleases/[...page]@_@astro":"pages/allreleases/_---page_.astro.mjs","\u0000@astro-page:src/pages/reviews/[...id]@_@astro":"pages/reviews/_---id_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_Bg2Inzsy.mjs","C:\\Users\\Raul Garza\\Documents\\Programming\\music-reviews\\.astro\\content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","C:\\Users\\Raul Garza\\Documents\\Programming\\music-reviews\\.astro\\content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_tz6w5RSi.mjs","C:/Users/Raul Garza/Documents/Programming/music-reviews/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_7r6kuvrQ.mjs","@astrojs/react/client.js":"_astro/client.CeYSYu5a.js","C:/Users/Raul Garza/Documents/Programming/music-reviews/src/components/NavBar.astro?astro&type=script&index=0&lang.ts":"_astro/NavBar.astro_astro_type_script_index_0_lang.CFVlI1a5.js","C:/Users/Raul Garza/Documents/Programming/music-reviews/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.DksKCMWR.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/Raul Garza/Documents/Programming/music-reviews/src/components/NavBar.astro?astro&type=script&index=0&lang.ts","const a=()=>{const t=document.querySelector(\"#btnMenu\"),e=document.querySelector(\"#navbar\");t?.addEventListener(\"click\",n=>{n.preventDefault(),e?.classList.toggle(\"hidden\"),e?.classList.toggle(\"block\"),e?.classList.toggle(\"nav-animation\")})};document.addEventListener(\"astro:page-load\",()=>{a()});"]],"assets":["/_astro/_page_.CMwrgNNq.css","/favicon.svg","/home.svg","/_astro/client.CeYSYu5a.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.DksKCMWR.js","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"ukpzRR84q7zg3+BCITgpq61dDEc7mZzWK/WH+kZE3DI="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
