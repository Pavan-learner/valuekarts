import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";

export const createProduct = async (req, res) => {
  try {
    // * we are accessing the elements from the formidable object
    const { name, slug, description, price, category, qty, shipping, imgLink } =
      req.fields;
    const { photo } = req.files;



    if (!name && !description && !price && !category && !qty && !shipping) {
      return res.status(401).send({
        error: "All fields are required",
      });
    }

    if (photo) {
      if (photo.size > 1000000) {
        return res.status(401).send({
          message: "Photo is required and it should be less than 4MB",
        });
      }
    }

    const product = await new productModel({
      ...req.fields,
      slug: slugify(name),
    });

    // Handle multiple image links
    if (imgLink) {
      const parsedLinks = JSON.parse(imgLink); // Parse the stringified array
      parsedLinks.forEach((link) => product.imgLink.push(link));
    }

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    // Handle multiple image links

    await product.save();
    res.status(200).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(400).send({ message: "Error while creating product" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .limit(12)
      .select("-photo")
      .sort({ createdAt: -1 });

    res.status(200).send({
      total_products: products.length,
      products,
    });
  } catch (error) {
    res.status(400).send({
      message: "Something went wrong while getting products",
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const pd = await productModel
      .findById(id)
      .select("-photo")
      .populate("category");

    res.status(200).send({
      success: true,
      message: "Product fetched successfully",
      pd,
    });
  } catch (error) {
    res.status(400).send({
      message: "something went wrong while fetching the product",
    });
  }
};

export const getProductPhoto = async (req, res) => {
  try {
    // const id = req.params.id;
    // const pd = await productModel.findById(id).select("photo");
    // if (pd && pd.photo) {
    //   res.set("Content-Type", "image/jpeg");
    //   return res.status(200).send(pd.data.photo);
    // }

    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", "image/jpeg");
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    res.status(400).send({
      message: "something went wrong while fetching the product photo",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, price, category, qty, shipping ,imgLink } =
      req.fields;
    const { photo } = req.files;

    if (!name && !description && !price && !category && !qty && !shipping) {
      return res.status(400).send({
        message: "All fields are required",
      });
    }

    const product = await productModel.findByIdAndUpdate(
      id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    // Handle multiple image links
    if(imgLink){
      const parsedLinks = JSON.parse(imgLink); // Parse the stringified array

      parsedLinks.forEach((link) => product.imgLink.push(link));
    }

    await product.save();
    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(400).send({
      message: "something went wrong while updating the product",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await productModel
      .findByIdAndDelete(req.params.id)
      .select("-photo");

    res.status(201).send({
      success: true,
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while delteing the product",
    });
  }
};

// * Search functionality
export const searchProducts = async (req, res) => {
  try {
    const keyword = req.params.keyword;

    const result = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while searching the product",
    });
  }
};


// * Section one Product fetching

export const getSectionOneProducts = async(req,res) =>{
  try {
    const products = await productModel.find().limit(8);
    res.json(products);
} catch (error) {
    res.status(500).json({ message: 'Server Error' });
}

}

export const getSectionTwoProducts  = async(req,res) =>{
  try {
    const products = await productModel.find().sort({ _id: -1 }).limit(4);

    res.json(products);
    
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
    
  }
}


export const getkProducts = async (req, res) => {
  const { page = 1, limit = 10, category } = req.query;

  const query = category ? { category } : {};

  const products = await productModel.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const totalProducts = await productModel.countDocuments(query);

  res.json({
    products,
    totalProducts,
  });
}

