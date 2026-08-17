import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <h3>{recipe.title}</h3>
      <p>
        <strong>Category:</strong> {recipe.category} <br />
        <strong>Region:</strong> {recipe.region} <br />
        <strong>Spice Level:</strong> {recipe.spiceLevel}
      </p>
      <Link to={`/recipe/${recipe._id}`} style={{ marginTop: 'auto' }}>
        <button className="secondary" style={{ width: '100%' }}>View Recipe</button>
      </Link>
    </div>
  );
}
