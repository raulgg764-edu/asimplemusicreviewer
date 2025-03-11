import { getCollection } from "astro:content";

async function getHomeReleases(){
    const reviews = await getCollection('reviews');
    const sortedReviews = reviews.sort((a,b)=> new Date(b.data.releaseDate).getTime() - new Date(a.data.releaseDate).getTime());

    const largeReleases = sortedReviews.filter(content=> content.data.type==="album"||content.data.type==="compilation").slice(0,2)
    const mediumReleases = sortedReviews.filter(content=> content.data.type==="ep").slice(0,4)
    const shortReleases = sortedReviews.filter(content=> content.data.type==="single"||content.data.type==="a/b").slice(0,4)
    
    const latestReleases = [].concat(largeReleases,mediumReleases,shortReleases);

    return latestReleases;
}

export {getHomeReleases}