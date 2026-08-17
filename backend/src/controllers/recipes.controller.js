import { getMongoDb } from '../config/mongo.js';
import { generateIndianRecipe } from '../services/llm.service.js';
import { ApiError } from '../middleware/errorHandler.js';
import { ObjectId } from 'mongodb';

export async function generate(req, res, next) {
  try {
    const { ingredients } = req.body;
    if (!ingredients || !Array.isArray(ingredients)) {
      throw new ApiError(400, 'Ingredients must be an array');
    }
    const recipe = await generateIndianRecipe(ingredients);
    res.status(200).json(recipe);
  } catch (err) {
    next(err);
  }
}

export async function save(req, res, next) {
  try {
    const db = getMongoDb();
    const recipe = { ...req.body, createdAt: new Date() };
    const result = await db.collection('recipes').insertOne(recipe);
    recipe._id = result.insertedId;
    res.status(201).json(recipe);
  } catch (err) {
    next(err);
  }
}

export async function list(req, res, next) {
  try {
    const db = getMongoDb();
    const category = req.query.category;
    // user input sanitization (basic mapping to query obj)
    const query = category && typeof category === 'string' ? { category } : {};
    
    const recipes = await db.collection('recipes').find(query).sort({ createdAt: -1 }).toArray();
    res.status(200).json(recipes);
  } catch (err) {
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const db = getMongoDb();
    const id = req.params.id;
    if (!ObjectId.isValid(id)) throw new ApiError(400, 'Invalid recipe ID');
    
    const recipe = await db.collection('recipes').findOne({ _id: new ObjectId(id) });
    if (!recipe) throw new ApiError(404, 'Recipe not found');
    
    res.status(200).json(recipe);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const db = getMongoDb();
    const id = req.params.id;
    if (!ObjectId.isValid(id)) throw new ApiError(400, 'Invalid recipe ID');

    const result = await db.collection('recipes').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) throw new ApiError(404, 'Recipe not found');
    
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
