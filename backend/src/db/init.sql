CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL  -- Curries, Dal, Sabzi, Rice, Roti/Paratha, Chaat, Mithai
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  category_id INTEGER NOT NULL REFERENCES categories(id),
  recipe_id VARCHAR(24) NOT NULL,   -- MongoDB ObjectId, stored as string (cross-DB reference)
  created_at TIMESTAMP DEFAULT NOW()
);

-- Seed demo user and categories (demonstrating relational seed data)
INSERT INTO users (name, email) VALUES ('Demo User', 'demo@foobu.app') ON CONFLICT DO NOTHING;
INSERT INTO categories (name) VALUES 
  ('Curries'), ('Dal'), ('Sabzi'), ('Rice'), ('Roti/Paratha'), ('Chaat'), ('Mithai')
ON CONFLICT DO NOTHING;
