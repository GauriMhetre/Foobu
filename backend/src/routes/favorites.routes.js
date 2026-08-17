import { Router } from 'express';
import * as favoritesController from '../controllers/favorites.controller.js';

const router = Router();

router.post('/', favoritesController.save);
router.get('/summary', favoritesController.summary);

export default router;
