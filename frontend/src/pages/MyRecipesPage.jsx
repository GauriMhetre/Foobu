import { useState, useEffect } from 'react';
import { getRecipes } from '../api/recipes.js';
import RecipeCard from '../components/RecipeCard.jsx';
import CategoryFilter from '../components/CategoryFilter.jsx';
import Loader from '../components/Loader.jsx';

export default function MyRecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setStatus('loading');
      try {
        const data = await getRecipes(category);
        if (!cancelled) {
          setRecipes(data);
          setStatus('success');
        }
      } catch {
        if (!cancelled) setStatus('error');
      }
    }
    load(); // queued as a microtask once awaited fetch resolves; UI stays responsive meanwhile
    return () => { cancelled = true; };
  }, [category]);

  return (
    <div>
      <h1 style={{ marginBottom: '1rem' }}>My Saved Recipes</h1>
      
      <CategoryFilter selected={category} onChange={setCategory} />

      {status === 'loading' && <Loader />}
      
      {status === 'error' && (
        <div className="card" style={{ color: 'var(--danger)' }}>
          Failed to load recipes.
        </div>
      )}

      {status === 'success' && recipes.length === 0 && (
        <div className="card">
          <p>No recipes found in this category.</p>
        </div>
      )}

      {status === 'success' && recipes.length > 0 && (
        <div className="recipe-grid">
          {recipes.map((r) => (
            <RecipeCard key={r._id} recipe={r} />
          ))}
        </div>
      )}
    </div>
  );
}
