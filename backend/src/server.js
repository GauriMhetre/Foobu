import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectMongo } from './config/mongo.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';
import recipesRoutes from './routes/recipes.routes.js';
import favoritesRoutes from './routes/favorites.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // body parsing
app.use(requestLogger);

app.use('/api/recipes', recipesRoutes);
app.use('/api/favorites', favoritesRoutes);

// Catch unmatched routes -> 404
app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Centralized error formatter
app.use(errorHandler);

async function start() {
  try {
    await connectMongo(); // Ensure Mongo is connected before starting
    app.listen(port, () => {
      console.log(`Backend server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
