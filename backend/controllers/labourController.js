import labourModel from "../models/labourModel.js";

export const createLabour = async (req, res) => {
  try {
    const { name, image } = req.body;

    const labour = await labourModel.create({
      name,
      image,
    });

    res
      .status(200)
      .send({ message: "Labour created successfully", labour: labour });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getLabours = async (req, res) => {
  try {
    const labours = await labourModel.find();
    res.status(200).send({ message: "labours fetched successfully", labours });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};


export const deleteLabour = async (req, res) => {
  try {
    const { id } = req.params;
    await labourModel.findByIdAndDelete(id);
    res.status(200).send({ message: "Labour deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
}

export const updateLabour = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;
    await labourModel.findByIdAndUpdate(id, { name, image });
    res.status(200).send({ message: "Labour updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
}