const spoonacularKey = import.meta.env.VITE_SPOONACULAR_KEY;
const mealDBUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

export async function getRecipesByIngredients(ingredientList) {
  const query = ingredientList.join(",");
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(query)}&number=9&apiKey=${spoonacularKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Failed to fetch recipes:", err);
    return [];
  }
}

export async function fetchRecipeById(id) {
  const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${spoonacularKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Failed to fetch recipe details:", err);
    return null;
  }
}

export async function fetchNutritionByRecipeId(id) {
  const url = `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${spoonacularKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Nutrition API error: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Failed to fetch nutrition data:", err);
    return null;
  }
}

export async function fetchRandomMeal() {
  try {
    const response = await fetch(mealDBUrl);
    const data = await response.json();
    return data.meals[0];
  } catch (err) {
    console.error("Failed to fetch random meal:", err);
    return null;
  }
}
