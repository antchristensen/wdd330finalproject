import { initIngredientForm } from "./ingredientForm.mjs";
import { getRecipesByIngredients } from "./api.mjs";
import { renderRecipeCards } from "./recipeRenderer.mjs";
import { showSurpriseRecipe } from "./surpriseRecipe.mjs";
import { loadPartials } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  loadPartials();

  const surpriseBtn = document.getElementById("surprise-btn");
  if (surpriseBtn) {
    surpriseBtn.addEventListener("click", showSurpriseRecipe);
  }

  initIngredientForm((ingredientList) => {
    getRecipesByIngredients(ingredientList).then((recipes) => {
      renderRecipeCards(recipes);
    });
  });
});
