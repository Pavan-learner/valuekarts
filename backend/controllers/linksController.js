import sectionLInksModel from "../models/sectionLInksModel.js";
import { updateCategory } from "./categoryController.js";

export const createLink = async (req, res) => {
  try {
    const { image } = req.body;

    // console.log(image);
    // Ensure that the 'link' is provided
    if (!image) {
      return res.status(400).send({
        success: false,
        message: "Link is required",
      });
    }

    const parsedLinks = JSON.parse(image);

    // Create a new document in the database
    const section = new sectionLInksModel();

    // Save the document to the database

    section.image = parsedLinks;
    await section.save();

    // Send a success response
    res.status(200).send({
      success: true,
      message: "Link added successfully",
    });
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error occurred:", error);

    // Send an internal server error response
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};


export const deleteLinks = async (req,res) =>{
    try {
        const {id} = req.params;

        const section = await sectionLInksModel.findByIdAndDelete(id);

        res.status(200).send({
            success:true,
            message:"Link deleted successfully"
        })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Internal server error"
        })
    }
}