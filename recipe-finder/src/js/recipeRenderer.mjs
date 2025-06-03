export function renderRecipeCards(recipes) {
  const container = document.getElementById("recipe-results");
  container.innerHTML = "";

  if (!recipes.length) {
    container.innerHTML = "<p>No recipes found. Try different ingredients.</p>";
    return;
  }

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">
      <h3>${recipe.title}</h3>
      <p><strong>Used:</strong> ${recipe.usedIngredientCount}</p>
      <p><strong>Missed:</strong> ${recipe.missedIngredientCount}</p>
    `;

    container.appendChild(card);
  });
}
