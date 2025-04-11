// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

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
          }),
          SPOTIFY_CLIENT_ID: envField.string({
            context:"server",
            access:"secret"
        })
      }
  },

  integrations: [react(), mdx()]
});