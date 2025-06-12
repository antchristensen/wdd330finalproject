// src/js/recipeDetail.mjs
import { fetchRecipeById } from "./api.mjs";
import { loadPartials } from "./utils.mjs";

async function init() {
  await loadPartials();

  const container = document.getElementById("recipe-details");
  const params = new URLSearchParams(window.location.search);
  const recipeId = params.get("id");

  if (!recipeId) {
    container.innerHTML = "<p>No recipe ID provided.</p>";
    return;
  }

  const recipe = await fetchRecipeById(recipeId);
  if (!recipe) {
    container.innerHTML = "<p>Error loading recipe details.</p>";
    return;
  }

  // ✅ Store env variable outside template string
  const apiKey = import.meta.env.VITE_SPOONACULAR_KEY;
  const nutritionHTML = `
    <iframe 
      src="https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget?apiKey=${apiKey}" 
      width="100%" 
      height="300" 
      frameborder="0"
      loading="lazy"
    ></iframe>
  `;

  container.innerHTML = `
    <h1>${recipe.title}</h1>
    <img src="${recipe.image}" alt="${recipe.title}" />
    <section>
      <h2>Ingredients</h2>
      <ul>${recipe.extendedIngredients.map((i) => `<li>${i.original}</li>`).join("")}</ul>
    </section>
    <section>
      <h2>Instructions</h2>
      <p>${recipe.instructions || "No instructions provided."}</p>
    </section>
    <section>
      <h2>Nutrition</h2>
      ${nutritionHTML}
    </section>
    <button id="favorite-btn">Favorite</button>
    <button onclick="history.back()">⬅ Back</button>
  `;

  const favBtn = document.getElementById("favorite-btn");
  let saved = JSON.parse(localStorage.getItem("favorites")) || [];
  let alreadySaved = saved.find((fav) => fav.id === recipe.id);

  function updateFavButton() {
    favBtn.textContent = alreadySaved
      ? "🗑 Remove from Favorites"
      : "❤️ Add to Favorites";
  }

  updateFavButton();

  favBtn.addEventListener("click", () => {
    if (alreadySaved) {
      saved = saved.filter((fav) => fav.id !== recipe.id);
      alert("Recipe removed from favorites!");
    } else {
      saved.push({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
      });
      alert("Recipe added to favorites!");
    }

    localStorage.setItem("favorites", JSON.stringify(saved));
    alreadySaved = !alreadySaved;
    updateFavButton();
  });
}

init();
