import userModel from "../models/userModel.js";

export const addToCartController = async (req,res) => {
  try {
    const {id} = req.params;
    const {item} = req.body;

    console.log(item);

    const user = await userModel.findById(id);

    user.cart.push(item);
    await user.save();
    res.status(200).send({
      success: true,
    })
    
  } catch (error) {
    res.status(500).send("Internal Server Error")
  }
  
}


export const removeFromCartController = async (req,res) => {
  try {
    const {id} = req.params;
    const {item} = req.body;

    const user = await userModel.findById(id);

    user.cart = user.cart.filter((i) => i._id !== item._id);

    await user.save();

    res.status(200).send({
      success: true,
      user
    })
    
  } catch (error) {
    res.status(500).send("Internal Server Error")
  }
  
}

export const getCart = async (req,res) => {
  try {
    const {id} = req.params;
    const user = await userModel.findById(id);
    res.status(200).send({
      success: true,
      cart: user.cart
    })
    
  } catch (error) {
    res.status(500).send("Internal Server Error")
  }
  
}
