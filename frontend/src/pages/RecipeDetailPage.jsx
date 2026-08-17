import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById, favoriteRecipe } from '../api/recipes.js';
import RecipeDetail from '../components/RecipeDetail.jsx';
import Loader from '../components/Loader.jsx';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [status, setStatus] = useState('loading');
  const [favStatus, setFavStatus] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setStatus('loading');
      try {
        const data = await getRecipeById(id);
        if (!cancelled) {
          setRecipe(data);
          setStatus('success');
        }
      } catch (err) {
        if (!cancelled) setStatus('error');
      }
    }
    load(); // Event loop: microtask queued after await
    return () => { cancelled = true; };
  }, [id]);

  async function handleFavorite() {
    try {
      setFavStatus('Saving...');
      await favoriteRecipe(recipe._id, recipe.category);
      setFavStatus('Favorited!');
      setTimeout(() => setFavStatus(''), 2000);
    } catch (err) {
      alert('Failed to favorite: ' + err.message);
      setFavStatus('');
    }
  }

  if (status === 'loading') return <Loader message="Loading recipe..." />;
  if (status === 'error') return (
    <div className="card">
      <h2 style={{ color: 'var(--danger)' }}>Recipe not found</h2>
      <button className="secondary" onClick={() => navigate('/my-recipes')} style={{ marginTop: '1rem' }}>
        Back to My Recipes
      </button>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <button className="secondary" onClick={() => navigate(-1)}>
          &larr; Back
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {favStatus && <span style={{ color: 'var(--primary)', fontWeight: 500 }}>{favStatus}</span>}
          <button onClick={handleFavorite}>★ Favorite</button>
        </div>
      </div>
      <RecipeDetail recipe={recipe} />
    </div>
  );
}
