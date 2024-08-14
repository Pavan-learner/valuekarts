import orderModel from "../models/orderModel.js";

export const getOrdersController = async (req, res) => {
  try {
      const userId = req.user._id;

      const orders = await orderModel.find({ buyer: userId }).populate({
          path: 'products', // Ensure this matches the field name in your orderSchema
          select: '-photo' // Exclude 'photo' field if it's not needed
      });

      res.status(200).json(orders);
      
  } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
  }
}


export const createOrderController = async(req,res) =>{
    try {
        const { products, buyer, address, total } = req.body;
    
        // Validation
        if (!products || !buyer || !address || !total) {
          return res.status(400).json({ error: "All fields are required" });
        }
    
        // Creating the order
        const order = new orderModel({ products, buyer, address, total });
        await order.save();
    
        res.status(201).json({ message: "Order created successfully", order });
      } catch (error) {
        console.error("Order creation failed:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
}


export const getAdminOrderController = async(req,res) =>{
  try {
    const orders = await orderModel.find({}).populate('products','-photo').populate('buyer','_name').sort({createdAt:-1});
    res.status(200).send(orders)
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving orders.",
    })
  }
}


export const getOrderDetailController  = async(req,res) =>{
  try {
    const {id} = req.params;
    const order = await orderModel.findById(id).populate('products','-photo').populate('buyer','name');
    res.status(200).send(order)
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}


export const updateOrderStatusController = async(req,res) =>{
  try {
    const {id} = req.params;
    const {status} = req.body;
    const order = await orderModel.findByIdAndUpdate(id,{status}, {new:true});
    res.status(200).send(order)
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:"Internal server error"
    })
  }
}

export const cancelOrderController = async(req,res) =>{
  try {
    const id = req.params.id;
    const reason = req.body.reason;

    const order = await orderModel.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status === 'Cancelled') {
      return res.status(400).json({ message: 'Order is already cancelled' });
    }

    order.status = 'Cancelled';

    order.reason = reason;
    
    await order.save();

    res.status(200).json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}