console.log("🚨 Vite config is being loaded");

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        favorites: resolve(__dirname, 'src/product_pages/favorites.html'),
        recipeDetail: resolve(__dirname, 'src/product_pages/recipe-detail.html'),
      },
    },
  },
});
