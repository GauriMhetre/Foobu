import { useState, useEffect } from 'react';
import { getFavoritesSummary } from '../api/recipes.js';
import Loader from '../components/Loader.jsx';

export default function FavoritesPage() {
  const [summary, setSummary] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setStatus('loading');
      try {
        const data = await getFavoritesSummary();
        if (!cancelled) {
          setSummary(data);
          setStatus('success');
        }
      } catch {
        if (!cancelled) setStatus('error');
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: '1rem' }}>Your Favorites</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        A quick look at your favorite recipes, grouped by category.
      </p>

      {status === 'loading' && <Loader message="Fetching your favorites..." />}

      {status === 'error' && (
        <div className="card" style={{ color: 'var(--danger)' }}>
          Failed to load favorites summary.
        </div>
      )}

      {status === 'success' && summary.length === 0 && (
        <div className="card">
          <p>You haven't favorited any recipes yet.</p>
        </div>
      )}

      {status === 'success' && summary.length > 0 && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg)', textAlign: 'left' }}>
                <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>Category</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)', textAlign: 'right' }}>Favorite Count</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((row) => (
                <tr key={row.category} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem' }}>
                    <strong style={{ color: 'var(--primary)' }}>{row.category}</strong>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold' }}>
                    {row.favorite_count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
