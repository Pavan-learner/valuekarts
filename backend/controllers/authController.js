import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/authEncryption.js";
import axios from "axios";

// * register handler
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    // validation
    if ((!phone || !email) && !password && !name ) {
      return res.send({ message: "All fields are required" });
    }

    // * Check if the use already exists or not

    if(email){
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(200).send({
          success: false,
          message: "User already exists",
        });
      }
    } else if(phone){
      const existingPhone = await userModel.findOne({ phone });
      if (existingPhone) {
        return res.status(200).send({
          success: false,
          message: "User already exists",
        });
    }
  }

    // * Registering the user

    const hashedPass = await hashPassword(password);

    // * saving the user
    const user = new userModel({
      name,
      email,
      phone,
      password: hashedPass,
    });

    await user.save();

     // * creating token
     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).send({
      success: true,
      message: "Registered Successfully",
      _id: user._id,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token
    });

  } catch (error) {
    // console.log(error);
    res.status(400).send({
      success: false,
      message: error.message,
      error,
    });
  }
};

// * Login Handler
export const loginController = async (req, res) => {
  try {
    const { email, phone, password } = req.body;


    console.log(email, phone, password);
    
    if ((!email || !phone) && !password) {
      return res.status(400).send({ message: "Email/Phone and Password are required" });
    }

    let user;

    if (email) {
      user = await userModel.findOne({ email });
    } else if (phone) {
      user = await userModel.findOne({ phone });
    }

    if (!user) {
      return res.status(400).send({ message: "User does not exist" });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({ message: "Wrong Password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        address: 'India',
      },
      token,
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
      error,
    });
  }
};

// * OTP sender
export const otpController = async (req, res) => {
  const { phone } = req.body;

  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  let data = JSON.stringify({
    phoneNumber: "91"+ phone,
    otpLength: 6,
    channel: "SMS",
    expiry: 60,
  });

  let config = {
    method: "POST",
    maxBodyLenght: Infinity,
    url: "https://auth.otpless.app/auth/otp/v1/send",
    headers: {
      clientId: clientId,
      clientSecret: clientSecret,
      "Content-Type": "application/json",
    },
    data: data,
  };

try
{
  const response = await axios.request(config);
  const orderId = response.data.orderId; // Extracting the orderId from the response
  res.status(200).json({ orderId });
}
    catch(error){
      res.status(500).json({ error: error.message });
    };
};

// * OTP verification
export const otpVerification = async (req, res) => {
  try {
    const { phone, otp, orderId } = req.body;

    console.log('Received OTP Verification Request:', { phone, otp, orderId });

    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;

    let data = JSON.stringify({
      orderId: orderId,
      otp: otp,
      phoneNumber:  phone
    });

    const config = {
      method: "POST",
      maxBodyLength: Infinity,  // Corrected property name
      url: "https://auth.otpless.app/auth/otp/v1/verify",
      headers: {
        clientId: clientId,
        clientSecret: clientSecret,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    res.status(200).json(response.data);
    
  } catch (error) {
    console.error("Error during OTP verification:", {
      message: error.message,
      stack: error.stack,
      response: error.response ? error.response.data : 'No response data'
    });

  }
};

export const getUserController = async(req,res) =>{
  try {
    const {id} = req.params;
    const user = await userModel.findById(id);

    res.status(200).send({
      success:true,
      user
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:"internal server error"
    })
  }
}

export const updateProfileController = async(req,res) =>{
  try {
    const {name, email, password, phone, address} = req.body;
    const user = await userModel.findById(req.user._id);
    if(name){   
      user.name = name;
    }
    if(email){
      user.email = email;
    }
    if(password){
      user.password = password;
    }
    if(address){
      user.address = address;
    }
    if(phone){  
      user.phone = phone;
    }

    await user.save();
    res.status(200).send({
      success:true,
      message:"Profile Updated Successfully",
      user
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:"internal server error"
    })
  }
}