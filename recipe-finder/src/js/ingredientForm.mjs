const ingredients = [];

function renderIngredients() {
  const list = document.getElementById("ingredient-list");
  list.innerHTML = "";

  ingredients.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "ingredient-tag";
    li.innerHTML = `${item} <button data-index="${index}" class="remove-btn">×</button>`;
    list.appendChild(li);
  });
}

export function initIngredientForm(onSubmit) {
  const form = document.getElementById("ingredient-form");
  const input = document.getElementById("ingredient-input");
  const listContainer = document.getElementById("ingredient-list");
  const searchBtn = document.getElementById("search-recipes");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value.trim();
    if (value && !ingredients.includes(value)) {
      ingredients.push(value);
      input.value = "";
      renderIngredients();
    }
  });

  listContainer.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
      const index = parseInt(e.target.dataset.index);
      ingredients.splice(index, 1);
      renderIngredients();
    }
  });

  searchBtn.addEventListener("click", () => {
    if (ingredients.length > 0 && typeof onSubmit === "function") {
      onSubmit(ingredients);
    }
  });
}
