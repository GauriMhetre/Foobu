import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import RecipeDetailPage from './pages/RecipeDetailPage.jsx';
import MyRecipesPage from './pages/MyRecipesPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <Link to="/" className="brand">Foobu</Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/my-recipes">My Recipes</Link>
          <Link to="/favorites">Favorites</Link>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route path="/my-recipes" element={<MyRecipesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
