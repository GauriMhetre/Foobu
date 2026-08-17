const categories = ['all', 'Curries', 'Dal', 'Sabzi', 'Rice', 'Roti/Paratha', 'Chaat', 'Mithai'];

export default function CategoryFilter({ selected, onChange }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label htmlFor="category-select" style={{ marginRight: '0.5rem', fontWeight: 500 }}>
        Filter by Category:
      </label>
      <select
        id="category-select"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: 'auto', display: 'inline-block' }}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat === 'all' ? 'All Categories' : cat}
          </option>
        ))}
      </select>
    </div>
  );
}
