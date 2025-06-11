import { initIngredientForm } from "./ingredientForm.mjs";
import { getRecipesByIngredients } from "./api.mjs";
import { renderRecipeCards } from "./recipeRenderer.mjs";
import { showSurpriseRecipe } from "./surpriseRecipe.mjs";
import { loadPartials } from "./utils.mjs";

loadPartials();

function handleIngredientSubmit(ingredientList) {
  getRecipesByIngredients(ingredientList).then((recipes) => {
    renderRecipeCards(recipes);
  });
}

initIngredientForm(handleIngredientSubmit);

document.addEventListener("DOMContentLoaded", () => {
  const surpriseBtn = document.getElementById("surprise-btn");
  if (surpriseBtn) {
    surpriseBtn.addEventListener("click", showSurpriseRecipe);
  }
});
