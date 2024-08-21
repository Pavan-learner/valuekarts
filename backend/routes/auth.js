import express from "express";
import {
  registerController,
  loginController,
  otpController,
  getUserController,
  otpVerification,
  updateProfileController,
  getUsersListController,
  resendOtpcontroller
} from "../controllers/authController.js";
import { isAdmin, requireSignin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
// router.get("/test", requireSignin, isAdmin, testController);

// * this routes is for sending the otp
router.post("/send-otp",otpController);
router.post("/verify",otpVerification);
router.post('/resend-otp',resendOtpcontroller)

// this is testing route for private route auntentication
router.get("/userAuth", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get('/adminAuth' , requireSignin, isAdmin,(req,res) =>{
  res.status(200).send({ok:true})
})

// * this route is for finding the user by id 
router.get('/get-user/:id',requireSignin,getUserController)


// ! This routes is for user profile update.
router.put('/update-user/:id',requireSignin,updateProfileController)


// * this route is getting all users
router.get('/get-users',requireSignin,isAdmin,getUsersListController);
export default router;
