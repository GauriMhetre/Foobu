import { ApiError } from '../middleware/errorHandler.js';

export function parseAndValidateRecipe(rawText) {
  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch (err) {
    throw new ApiError(502, 'Malformed LLM output: not valid JSON');
  }

  const { title, region, spiceLevel, category, ingredients, steps } = parsed;

  if (!title || typeof title !== 'string') throw new ApiError(502, 'Missing or invalid title');
  if (!region || typeof region !== 'string') throw new ApiError(502, 'Missing or invalid region');
  if (!spiceLevel || typeof spiceLevel !== 'string') throw new ApiError(502, 'Missing or invalid spiceLevel');
  if (!category || typeof category !== 'string') throw new ApiError(502, 'Missing or invalid category');
  if (!Array.isArray(ingredients) || ingredients.length === 0) throw new ApiError(502, 'Missing or invalid ingredients array');
  if (!Array.isArray(steps) || steps.length === 0) throw new ApiError(502, 'Missing or invalid steps array');

  // Validate ingredient structure
  ingredients.forEach((ing) => {
    if (!ing.item || typeof ing.item !== 'string' || !ing.quantity || typeof ing.quantity !== 'string') {
      throw new ApiError(502, 'Invalid ingredient structure');
    }
  });

  // Validate steps
  steps.forEach((step) => {
    if (typeof step !== 'string') throw new ApiError(502, 'Invalid step structure');
  });

  return {
    title,
    region,
    spiceLevel,
    category,
    ingredients,
    steps
  };
}
