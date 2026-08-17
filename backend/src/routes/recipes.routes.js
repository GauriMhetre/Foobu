import { Router } from 'express';
import * as recipesController from '../controllers/recipes.controller.js';

const router = Router();

router.post('/generate', recipesController.generate);
router.post('/', recipesController.save);
router.get('/', recipesController.list);
router.get('/:id', recipesController.getById);
router.delete('/:id', recipesController.remove);

export default router;
