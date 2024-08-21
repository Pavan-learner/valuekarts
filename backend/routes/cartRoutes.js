import express from 'express';
import { requireSignin } from '../middleware/authMiddleware.js';
import { createCartController, readCartController } from '../controllers/cartController.js';

const router = express.Router();


router.post('/save-cart', requireSignin,createCartController);
router.get('/list-cart', requireSignin,readCartController);

export default router;