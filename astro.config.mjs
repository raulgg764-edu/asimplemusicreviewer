// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    env:{
        schema: {
            SPOTIFY_SECRET_KEY: envField.string({
                context:"server",
                access:"secret"
            })
        }
    }
});
