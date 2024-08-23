import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import moment from "moment";

export const getOrdersController = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await orderModel
      .find({ buyer: userId })
      .populate({
        path: "products", // Ensure this matches the field name in your orderSchema
        select: "-photo", // Exclude 'photo' field if it's not needed
      })
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const createOrderController = async (req, res) => {
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
};

export const getAdminOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "_name")
      .sort({ createdAt: -1 });
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving orders.",
    });
  }
};

export const getOrderDetailController = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderModel
      .findById(id)
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateOrderStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await orderModel.findById(id);
    if (!order) {
      return res.status(404).send({
        message: "Order not found",
      });
    }

    if (status === "Delivered") {
      const returnDays = 5; // Number of days allowed for return
      const deliveryDate = moment(); // Assuming the order is delivered now
      const returnExpiryDate = deliveryDate.add(returnDays, "days").toDate(); // Calculate return expiry date

      console.log(returnExpiryDate);

      order.deliveryDate = deliveryDate.toDate(); // Update delivery date
      order.returnExpiryDate = returnExpiryDate; // Set the return expiry date
    }

    if (status === "Return" || status === "Returned") {
      const currentDate = moment();
      const returnExpiryDate = moment(order.returnExpiryDate);

      if (currentDate.isAfter(returnExpiryDate)) {
        return res.status(400).send({
          message: "Return period has expired",
        });
      }
    }

    order.status = status;

    await order.save();

    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

export const cancelOrderController = async (req, res) => {
  try {
    const id = req.params.id;
    const reason = req.body.reason;

    const order = await orderModel.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "Cancelled") {
      return res.status(400).json({ message: "Order is already cancelled" });
    }

    order.status = "Cancelled";

    order.reason = reason;

    await order.save();

    res.status(200).json({ message: "Order cancelled successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const returnOrderController = async (req, res) => {
  try {
    const id = req.params.id;
    const reason = req.body.reason;

    const order = await orderModel.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "Return" || order.status === "Returned") {
      return res.status(300).json({ message: "Order is already returned" });
    }

    order.status = "Return";

    order.reason = reason;

    await order.save();

    res
      .status(200)
      .json({ message: "Order Return request submitted successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const rateProductBasedOnOrderController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { userId, productRatings } = req.body;

    console.log("Backend Data : ", orderId, userId, productRatings);

    if (!orderId || !userId || !productRatings) {
      return res.status(400).send({ message: "Invalid input" });
    }

    // Fetch the order
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update product ratings
    const updatePromises = order.products.map(async (product) => {
      let foundPd = await productModel.findById(product._id);

      if (foundPd) {
        // Check if the user has already rated this product
        let existingRatingIndex = foundPd.ratings.findIndex(
          (r) => r.user.toString() === userId.toString()
        );

        if (existingRatingIndex > -1) {
          // Update existing rating
          foundPd.ratings[existingRatingIndex].rating =
            productRatings[product._id] || 0;
        } else {
          // Add new rating
          foundPd.ratings.push({
            user: userId,
            rating: productRatings[product._id] || 0,
          });
        }

        // Save the updated product
        await foundPd.save();
      }
    });

    // Wait for all product updates to complete
    await Promise.all(updatePromises);

    res.status(200).json({ message: "Ratings updated successfully" });
  } catch (error) {
    console.error("Error updating product ratings:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
