import express from 'express';
import { cancelOrderController, createOrderController, getAdminOrderController, getOrderDetailController, getOrdersController, returnOrderController, updateOrderStatusController } from '../controllers/orderControllers.js';
import { isAdmin, requireSignin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/get-orders',requireSignin,getOrdersController)

router.post('/create-order',createOrderController);

router.get('/admin-orders',requireSignin,isAdmin, getAdminOrderController);

router.get('/get-order-detail/:id',requireSignin,isAdmin, getOrderDetailController);

router.put('/update-order-status/:id',requireSignin,isAdmin,updateOrderStatusController);

router.put('/cancel-order/:id',requireSignin,cancelOrderController);

router.put('/return-order/:id',requireSignin,returnOrderController);


export default router;