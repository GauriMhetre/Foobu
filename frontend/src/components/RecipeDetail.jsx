export default function RecipeDetail({ recipe }) {
  return (
    <div className="card">
      <h2 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>{recipe.title}</h2>
      <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        <span><strong>Region:</strong> {recipe.region}</span>
        <span><strong>Spice:</strong> {recipe.spiceLevel}</span>
        <span><strong>Category:</strong> {recipe.category}</span>
      </div>

      <h3>Ingredients</h3>
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        {recipe.ingredients.map((ing, idx) => (
          <li key={idx}>
            {ing.quantity} {ing.item}
          </li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <ol style={{ marginLeft: '1.5rem' }}>
        {recipe.steps.map((step, idx) => (
          <li key={idx} style={{ marginBottom: '0.5rem' }}>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
