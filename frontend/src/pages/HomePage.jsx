import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IngredientForm from '../components/IngredientForm.jsx';
import RecipeDetail from '../components/RecipeDetail.jsx';
import { generateRecipe, saveRecipe } from '../api/recipes.js';

export default function HomePage() {
  const [recipe, setRecipe] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, loading, error, success
  const [errorMsg, setErrorMsg] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  async function handleGenerate(ingredients) {
    setStatus('loading');
    setErrorMsg('');
    setRecipe(null);
    try {
      const generated = await generateRecipe(ingredients);
      setRecipe(generated);
      setStatus('success');
    } catch (err) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  }

  async function handleSave() {
    if (!recipe) return;
    setSaving(true);
    try {
      const saved = await saveRecipe(recipe);
      navigate(`/recipe/${saved._id}`);
    } catch (err) {
      alert('Failed to save recipe: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Discover Your Next Meal</h1>
      <IngredientForm onSubmit={handleGenerate} loading={status === 'loading'} />
      
      {status === 'error' && (
        <div className="card" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>
          <p><strong>Error:</strong> {errorMsg}</p>
        </div>
      )}

      {recipe && (
        <div style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2>Your Generated Recipe</h2>
            <button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Recipe'}
            </button>
          </div>
          <RecipeDetail recipe={recipe} />
        </div>
      )}
    </div>
  );
}
