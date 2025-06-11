import { fetchRandomMeal } from "./api.mjs";

export async function showSurpriseRecipe() {
  const meal = await fetchRandomMeal();
  if (!meal) {
    alert("No recipe found.");
    return;
  }

  
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push(`${meas?.trim() || ""} ${ing.trim()}`);
    }
  }

  
  let saved = JSON.parse(localStorage.getItem("favorites")) || [];
  const alreadySaved = saved.find((fav) => fav.id === meal.idMeal);

  const modal = document.createElement("div");
  modal.classList.add("surprise-modal");
  modal.innerHTML = `
    <div class="modal-content">
      <button class="close-btn">×</button>
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <p><strong>Category:</strong> ${meal.strCategory}</p>
      <p><strong>Area:</strong> ${meal.strArea}</p>
      <h3>Ingredients</h3>
      <ul>${ingredients.map((i) => `<li>${i}</li>`).join("")}</ul>
      <h3>Instructions</h3>
      <p>${meal.strInstructions}</p>
      <button id="save-surprise-btn">${alreadySaved ? "🗑 Remove from Favorites" : "❤️ Save to Favorites"}</button>
    </div>
  `;

  document.body.appendChild(modal);

  document
    .querySelector(".close-btn")
    .addEventListener("click", () => modal.remove());

  
  const saveBtn = document.getElementById("save-surprise-btn");
  saveBtn.addEventListener("click", () => {
    if (alreadySaved) {
      saved = saved.filter((fav) => fav.id !== meal.idMeal);
      alert("Removed from favorites.");
      saveBtn.textContent = "❤️ Save to Favorites";
    } else {
      saved.push({
        id: meal.idMeal,
        title: meal.strMeal,
        image: meal.strMealThumb,
        source: "mealdb",
      });
      alert("Saved to favorites!");
      saveBtn.textContent = "🗑 Remove from Favorites";
    }

    localStorage.setItem("favorites", JSON.stringify(saved));
  });
}
