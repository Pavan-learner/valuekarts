import { isAdmin, requireSignin } from "../middleware/authMiddleware.js";
import { createLabour, deleteLabour, getLabours, updateLabour } from "../controllers/labourController.js";
import express from 'express';

const router = express.Router();


router.post('/create-labour',requireSignin,isAdmin,createLabour);

router.get('/get-labours',getLabours);

router.put('/update-labour/:id',requireSignin,isAdmin,updateLabour);

router.delete('/delete-labour/:id',requireSignin,isAdmin,deleteLabour);


export default router;