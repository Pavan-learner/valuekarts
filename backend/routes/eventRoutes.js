import express from "express";
import { isAdmin, requireSignin } from "../middleware/authMiddleware.js";
import { createEventController, deleteEventController, getEventsController, getSingleEvent, updateEventController } from "../controllers/eventControllers.js";

const router = express.Router();


router.get('/get-events',getEventsController);
router.get('/get-event/:id',getSingleEvent);

router.post('/create-event',requireSignin,isAdmin,createEventController);

router.put('/update-event/:id',requireSignin,isAdmin,updateEventController);

router.delete('/delete-event/:id',requireSignin,isAdmin,deleteEventController);



export default router;