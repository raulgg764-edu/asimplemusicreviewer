import { defineCollection, z } from 'astro:content'

import { glob } from 'astro/loaders'

const reviews = defineCollection({
    loader: glob({pattern: '**/*.md', base: './src/content/reviews' }),
    schema: z.object({
        title: z.string(),
        artists: z.string().array(),
        releaseDate: z.string().date(),
        type: z.enum(["album", "ep", "single","a/b","compilation"]),
        rate: z.number(),
        spotifyUrl: z.string().url()
      })
    
})

export const collections = {reviews}