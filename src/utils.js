import { getCollection } from "astro:content";

import { SPOTIFY_SECRET_KEY, SPOTIFY_CLIENT_ID } from "astro:env/server";

async function getHomeReleases(){
    const reviews = await getCollection('reviews');
    const sortedReviews = reviews.sort((a,b)=> new Date(b.data.reviewDate).getTime() - new Date(a.data.reviewDate).getTime());

    const largeReleases = sortedReviews.filter(content=> content.data.type==="album"||content.data.type==="compilation").slice(0,2)
    const mediumReleases = sortedReviews.filter(content=> content.data.type==="ep").slice(0,4)
    const shortReleases = sortedReviews.filter(content=> content.data.type==="single"||content.data.type==="a/b").slice(0,4)
    
    const latestReleases = [].concat(largeReleases,mediumReleases,shortReleases);

    return latestReleases;
}

const spotifyToken = await fetch(`https://accounts.spotify.com/api/token`, {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
        "grant_type=client_credentials&client_id=" +
        SPOTIFY_CLIENT_ID +
        "&client_secret=" +
        SPOTIFY_SECRET_KEY,
}).then((res)=>res.json()).then((data) => data.access_token)

async function getImageSpotify(searchValue, type) {
    let img;
    if(type==="id"){
        const spotifyData = await fetch(`https://api.spotify.com/v1/albums/${searchValue}`,{method:"GET", headers:{'Authorization':`Bearer ${spotifyToken}`}}).then(res => res.json())
        console.log(searchValue)
        img = spotifyData.images[0].url;
        
    } else if (type==="search") {
        const data = await fetch(`https://api.spotify.com/v1/search?q=${searchValue}&type=artist&limit=1`,{method:"GET", headers:{'Authorization':`Bearer ${spotifyToken}`}}).then(res => res.json())
        img = data.artists.items[0].images[0].url
    }
    //img = "https://i.scdn.co/image/ab6761610000e5ebad063956e4de03835dba4828";
    return img
}  
export function getTextColorForBackground(bgColor) {
	// Remueve el '#' si existe
	const color = bgColor.replace("#", "");

	// Convierte el hex a RGB
	const r = parseInt(color.substr(0, 2), 16);
	const g = parseInt(color.substr(2, 2), 16);
	const b = parseInt(color.substr(4, 2), 16);

	// Luminancia relativa (fórmula de WCAG)
	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

	// Si es muy clara, regresa texto oscuro, si es oscura, regresa texto claro
	return luminance > 0.6 ? "bg-black/10" : "backdrop-brightness-90";
}

export {getHomeReleases, spotifyToken, getImageSpotify,getTextColorForBackground}
