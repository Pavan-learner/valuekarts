import vechicleModel from "../models/vechicleModel.js";

export const createVehicle = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;

    if (!name || !price || !description) {
      return res.status(401).send({
        success: false,
        message: "All fields are required",
      });
    }

    const vehicle = await vechicleModel.create({
      name,
      price,
      description,
    });

    if (image) {
      const parsedData = JSON.parse(image);
      vehicle.image = parsedData;
    }

    await vehicle.save(); // Save the vehicle if image was added

    res.status(201).send({
      success: true,
      message: "Vehicle created successfully",
      vehicle,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};


export const getVechiclesControllers = async (req, res) => {
  try {
    const vechicle = await vechicleModel.find({});

    res.status(200).send({
      success: true,
      vechicle,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getSingleVechicleController = async (req, res) => {
  try {
    const { id } = req.params;

    const vechicle = await vechicleModel.findById(id);
    res.status(200).send({
      success: true,
      vechicle,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteVechicleController = async (req, res) => {
  try {
    const { id } = req.params;
    await vechicleModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Vechicle deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateVechicleController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, image } = req.body;
    const vechicle = await vechicleModel.findByIdAndUpdate(id, {
      name,
      price,
      description,
    });

    if (image) {
      const prasedData = JSON.parse(image);
      vechicle.image = prasedData;
    }

    await vechicle.save();
    res.status(200).send({
      success: true,
      message: "Vechicle updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};
