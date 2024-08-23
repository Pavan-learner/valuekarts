import express from 'express';
import { requireSignin } from '../middleware/authMiddleware.js';
import { addToCartController, getCart, removeFromCartController } from '../controllers/cartController.js';


const router = express.Router();


router.post('/add-to-cart/:id', requireSignin,addToCartController);
router.put('/remove-from-cart/:id', requireSignin,removeFromCartController);
router.get('/get-cart/:id', requireSignin,getCart);

export default router;