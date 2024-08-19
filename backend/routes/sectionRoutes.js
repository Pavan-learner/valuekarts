import express from 'express';
import { isAdmin, requireSignin } from '../middleware/authMiddleware.js';
import sectionLInksModel from '../models/sectionLInksModel.js';
import { createLink, deleteLinks,  } from '../controllers/linksController.js';


const router = express.Router();


router.post('/section-one',requireSignin,isAdmin, createLink)


router.delete('/delete-link/:id',requireSignin,isAdmin, deleteLinks)




router.get('/section-link' , async(req, res) => {    
    try {
        const section =  await sectionLInksModel.find();
        res.status(200).send({
            success:true,
            section
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Internal server error"
        })
    }
})

export default router