import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const { name , image } = req.body;

    // * check for existing category
    const existingCate = await categoryModel.findOne({ name });
    if (existingCate) {
      return res.status(400).send({ message: "Category already exists" });
    }

    const newCategory = new categoryModel({
      name,
      image,
      slug: slugify(name),
    });

    await newCategory.save();
    res.status(200).send({ message: "Category created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error while creating category" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const allcategories = await categoryModel.find({});

    res.status(200).send({ message: "All categories", data: allcategories });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error while getting categories" });
  }
};


export const getSingleCategory = async (req,res) =>{
    try {
        const {slug} = req.params;

        console.log(slug)
        const category = await categoryModel.findOne({slug: req.params.slug});

        res.status(200).send({
            success:true,
            message:"Category fetched successfully",
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error while getting category" });
    }
}

export const updateCategory = async (req,res) =>{
    try {
        const {name,image} = req.body;
        const {id} = req.params;

        const category  = await categoryModel.findByIdAndUpdate(id,{name,image,slug:slugify(name)});

        res.status(200).send({
            success:true,
            message:"Category updated successfully",
            category,
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message:"something went wrong while updating category"
        })
    }
}

export const deleteCategory = async (req,res) =>{
    try {
        const {id} = req.params;
        const category = await categoryModel.findByIdAndDelete(id);

        res.status(200).send({
            success:true,
            message:"Category deleted successfully",
        })
    } catch (error) {
        // console.log(error);
        res.status(400).send({
            message:"something went wrong while deleting category"
        })
    }
}