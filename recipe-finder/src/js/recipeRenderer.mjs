export function renderRecipeCards(recipes) {
  const container = document.getElementById("recipe-results");
  container.innerHTML = "";

  if (!recipes.length) {
    container.innerHTML = "<p>No recipes found. Try different ingredients.</p>";
    return;
  }

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("recipe-card", "fade-in");

    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">
      <h3>${recipe.title}</h3>
      <p><strong>Used:</strong> ${recipe.usedIngredientCount}</p>
      <p><strong>Missed:</strong> ${recipe.missedIngredientCount}</p>
      <a href="/src/product_pages/recipe-detail.html?id=${recipe.id}" class="view-details-button">🔍 View Recipe</a>
    `;

    container.appendChild(card);
  });
}
