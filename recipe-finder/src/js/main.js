import { initIngredientForm } from "./ingredientForm.mjs";
import { getRecipesByIngredients } from "./api.mjs";
import { renderRecipeCards } from "./recipeRenderer.mjs";

function loadPartial(id, path) {
  fetch(path)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById(id).innerHTML = html;
    });
}

loadPartial("site-header", "/header.html");
loadPartial("site-footer", "/footer.html");

function handleIngredientSubmit(ingredientList) {
  getRecipesByIngredients(ingredientList).then((recipes) => {
    renderRecipeCards(recipes);
  });
}

initIngredientForm(handleIngredientSubmit);
