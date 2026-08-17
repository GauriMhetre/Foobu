import { parseAndValidateRecipe } from './recipeSchema.js';
import { ApiError } from '../middleware/errorHandler.js';

// function hoisting: buildPrompt can be defined below its usage
export async function generateIndianRecipe(ingredients) {
  const prompt = buildPrompt(ingredients);

  const url = process.env.LLM_API_URL;
  if (!url || !url.startsWith('https://')) {
     throw new ApiError(500, 'LLM API URL must be configured and use HTTPS');
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.LLM_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      max_tokens: 800,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) throw new ApiError(502, 'LLM request failed');

  const data = await res.json();
  // Adjust based on standard chat completion response format
  const raw = data.content?.[0]?.text ?? data.choices?.[0]?.message?.content ?? data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  
  // Clean markdown wrapping if present
  let cleanedRaw = raw.trim();
  if (cleanedRaw.startsWith('```json')) cleanedRaw = cleanedRaw.slice(7);
  if (cleanedRaw.startsWith('```')) cleanedRaw = cleanedRaw.slice(3);
  if (cleanedRaw.endsWith('```')) cleanedRaw = cleanedRaw.slice(0, -3);

  return parseAndValidateRecipe(cleanedRaw.trim()); // throws ApiError(502, 'Malformed LLM output') on failure
}

function buildPrompt(ingredients) {
  return `You are an expert Indian home cook. Using ONLY these ingredients (plus common Indian pantry staples like salt, oil, water): ${ingredients.join(', ')}.

Return STRICT JSON only, no prose, no markdown, matching exactly this shape:
{
  "title": string,
  "region": "North Indian" | "South Indian" | "Bengali" | "Gujarati" | "Other",
  "spiceLevel": "mild" | "medium" | "spicy",
  "category": "Curries" | "Dal" | "Sabzi" | "Rice" | "Roti/Paratha" | "Chaat" | "Mithai",
  "ingredients": [{ "item": string, "quantity": string }],
  "steps": [string]
}`;
}
