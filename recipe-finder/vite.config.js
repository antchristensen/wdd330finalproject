// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/', // update if your Netlify site uses a different subpath
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        favorites: 'src/product_pages/favorites.html',
        recipeDetail: 'src/product_pages/recipe-detail.html'
      }
    }
  }
});