const apiKey = import.meta.env.VITE_SPOONACULAR_KEY;
const baseUrl = "https://api.spoonacular.com/recipes/findByIngredients";

export async function getRecipesByIngredients(ingredientList) {
  const query = ingredientList.join(",");
  const url = `${baseUrl}?ingredients=${encodeURIComponent(query)}&number=9&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Failed to fetch recipes:", err);
    return [];
  }
}
