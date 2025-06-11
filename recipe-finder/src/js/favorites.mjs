import { loadPartials } from "./utils.mjs";

loadPartials(); 

const container = document.getElementById("favorite-recipes");
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

if (!favorites.length) {
  container.innerHTML = "<p>You have no saved recipes.</p>";
} else {
  favorites.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("recipe-card", "fade-in");

    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img" />
      <h3>${recipe.title}</h3>
      <a href="/src/product_pages/recipe-detail.html?id=${recipe.id}" class="view-details-button">🔍 View Details</a>
    `;

    container.appendChild(card);
  });
}
