export async function generateRecipe(ingredients) {
  const res = await fetch('/api/recipes/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to generate recipe');
  }
  return res.json();
}

export async function saveRecipe(recipeData) {
  const res = await fetch('/api/recipes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipeData),
  });
  if (!res.ok) throw new Error('Failed to save recipe');
  return res.json();
}

export async function getRecipes(category) {
  const query = category && category !== 'all' ? `?category=${category}` : '';
  const res = await fetch(`/api/recipes${query}`);
  if (!res.ok) throw new Error('Failed to fetch recipes');
  return res.json();
}

export async function getRecipeById(id) {
  const res = await fetch(`/api/recipes/${id}`);
  if (!res.ok) throw new Error('Failed to fetch recipe');
  return res.json();
}

export async function favoriteRecipe(recipeId, category) {
  const res = await fetch('/api/favorites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipeId, category }),
  });
  if (!res.ok) throw new Error('Failed to favorite recipe');
  return res.json();
}

export async function getFavoritesSummary() {
  const res = await fetch('/api/favorites/summary');
  if (!res.ok) throw new Error('Failed to fetch favorites summary');
  return res.json();
}
