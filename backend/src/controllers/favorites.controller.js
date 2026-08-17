import { query } from '../config/postgres.js';
import { ApiError } from '../middleware/errorHandler.js';

export async function save(req, res, next) {
  try {
    // For demo purposes, hardcoding user_id to 1 (seeded user).
    // In a real app this would come from the auth token.
    const userId = 1; 
    const { category, recipeId } = req.body;

    if (!category || !recipeId) {
      throw new ApiError(400, 'category and recipeId are required');
    }

    // Use parameterized query to prevent SQL injection
    const catRes = await query('SELECT id FROM categories WHERE name = $1', [category]);
    if (catRes.rows.length === 0) {
      throw new ApiError(400, 'Invalid category');
    }
    const categoryId = catRes.rows[0].id;

    // Check if it's already favorited to avoid duplicates
    const checkRes = await query(
      'SELECT id FROM favorites WHERE user_id = $1 AND recipe_id = $2',
      [userId, recipeId]
    );
    if (checkRes.rows.length > 0) {
      return res.status(200).json({ message: 'Already favorited' });
    }

    // Insert into favorites
    await query(
      'INSERT INTO favorites (user_id, category_id, recipe_id) VALUES ($1, $2, $3)',
      [userId, categoryId, String(recipeId)]
    );

    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
}

export async function summary(req, res, next) {
  try {
    const userId = 1; // using seeded demo user
    
    // SQL JOIN across users, favorites, and categories
    const sql = `
      SELECT c.name AS category, COUNT(f.id)::int AS favorite_count
      FROM favorites f
      JOIN categories c ON f.category_id = c.id
      WHERE f.user_id = $1
      GROUP BY c.name
      ORDER BY favorite_count DESC;
    `;
    const result = await query(sql, [userId]);
    res.status(200).json(result.rows);
  } catch (err) {
    next(err);
  }
}
