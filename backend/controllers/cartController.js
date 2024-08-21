import cartModel from "../models/cartModel.js";

export const createCartController = async (req, res) => {
  try {
    const { cart } = req.body;
    const userId = req.user._id;

    let userCart = await cartModel.findOne({ user: userId });
    if (userCart) {
      userCart.products = cart;
    } else {
      userCart = new cartModel({ user: userId, products: cart });
    }

    await userCart.save();
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

export const readCartController = async (req, res) => {
  try {
    const userId = req.user._id;
    const userCart = await cartModel
      .findOne({ user: userId })
      .populate("products.product");
      
    if (userCart) {
      res.status(200).json({ cart: userCart.products });
    } else {
      res.status(200).json({ cart: [] });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
