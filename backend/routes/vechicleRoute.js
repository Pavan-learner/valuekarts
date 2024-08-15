import express from 'express';
import { isAdmin, requireSignin } from '../middleware/authMiddleware.js';
import { createVehicle, deleteVechicleController, getSingleVechicleController, getVechiclesControllers, updateVechicleController } from '../controllers/vecicleController.js';

const router = express.Router();


router.post('/create-vehicle',requireSignin,isAdmin,createVehicle);

router.get('/get-vehicles',getVechiclesControllers);

router.get('/get-single-vehicle/:id',getSingleVechicleController);

router.delete('/delete-vehicle/:id',requireSignin,isAdmin,deleteVechicleController);

router.put('/update-vechicle/:id',requireSignin,isAdmin,updateVechicleController);


export default router;