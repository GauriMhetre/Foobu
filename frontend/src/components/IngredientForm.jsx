import { useState } from 'react';

const placeholders = ['paneer', 'tomatoes', 'ginger', 'onion', 'garam masala'];

export default function IngredientForm({ onSubmit, loading }) {
  const [inputs, setInputs] = useState(['', '', '']);

  function handleChange(index, value) {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  }

  function handleAddRow() {
    setInputs([...inputs, '']);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const ingredients = inputs.map((s) => s.trim()).filter(Boolean);
    if (ingredients.length > 0) {
      onSubmit(ingredients);
    }
  }

  const hasIngredients = inputs.some(s => s.trim().length > 0);

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>What's in your kitchen today?</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Add your ingredients below and we'll turn them into an authentic Indian recipe.
      </p>
      
      {inputs.map((val, idx) => (
        <input
          key={idx}
          type="text"
          value={val}
          onChange={(e) => handleChange(idx, e.target.value)}
          placeholder={`Ingredient ${idx + 1} (e.g. ${placeholders[idx % placeholders.length]})`}
          disabled={loading}
          style={{ marginBottom: '0.5rem' }}
        />
      ))}
      
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button 
          type="button" 
          onClick={handleAddRow} 
          className="secondary" 
          disabled={loading}
          style={{ flex: 1 }}
        >
          + Add Ingredient
        </button>
        <button type="submit" disabled={loading || !hasIngredients} style={{ flex: 1 }}>
          {loading ? 'Generating...' : 'Generate Recipe'}
        </button>
      </div>
    </form>
  );
}
