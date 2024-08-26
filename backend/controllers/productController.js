import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";

export const createProduct = async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      price,
      category,
      stock,
      shipping,
      imgLink,
      variety,
      originalPrice,
      deliveryCharge,
      returnDays,
      replacementDays ,
    } = req.fields;
    const { photo } = req.files;

    if (!name || !description || !price || !category || !stock || !shipping) {
      return res.status(401).send({
        error: "All required fields must be filled",
      });
    }

    const product = new productModel({
      id,
      name,
      slug: slugify(name),
      description,
      price,
      category,
      stock,
      shipping,
      originalPrice,
      deliveryCharge,
      returnDays,
      replacementDays,
    });

    // Handle multiple image links
    if (imgLink) {
      try {
        const parsedLinks = JSON.parse(imgLink);
        // Parse the stringified array
        product.imgLink = parsedLinks;
      } catch (error) {
        return res.status(400).send({ message: "Invalid imgLink format" });
      }
    }

    // Handle multiple variety items
    if (variety) {
      try {
        const parsedVariety = JSON.parse(variety);
        product.variety = parsedVariety;
      } catch (error) {
        return res.status(400).send({ message: "Invalid variety format" });
      }
    }

    // Handle photo upload
    if (photo) {
      if (photo.size > 4000000) {
        return res.status(401).send({
          message: "Photo should be less than 4MB",
        });
      }
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.status(200).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "Error while creating product" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
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
    const {
      pid,
      name,
      description,
      price,
      category,
      stock,
      shipping,
      imgLink,
      variety,
      originalPrice,
      deliveryCharge,
      returnDays,
      replacementDays
    } = req.fields;
    const { photo } = req.files;

    // Find the product by ID

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    // Check for required fields
    if (!name || !description || !price || !category || !stock || !shipping) {
      return res
        .status(400)
        .send({ error: "All required fields must be filled" });
    }

    // Update product fields
    product.name = name;
    product.slug = slugify(name); // Ensure slugify is correctly imported
    product.description = description;
    product.price = price;
    product.category = category;
    product.stock = stock;
    product.shipping = shipping;
    product.id = pid; // * Custom ID for Product
    product.originalPrice = originalPrice;
    product.deliveryCharge = deliveryCharge;
    product.returnDays = returnDays;
    product.replacementDays = replacementDays;

    // Handle photo update
    if (photo) {
      if (photo.size > 1000000) {
        // Example size check
        return res
          .status(400)
          .send({ message: "Photo size should be less than 1MB" });
      }
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    // Handle multiple image links
    if (imgLink) {
      product.imgLink = JSON.parse(imgLink); // Replace existing links
    }

    // Handle variety
    if (variety) {
      try {
        const parsedVariety = JSON.parse(variety);


        product.variety = parsedVariety;
        console.log("The parsed variety is:", parsedVariety);

        // Replace existing varieties
      } catch (error) {
        return res.status(400).send({ message: "Invalid variety format" });
      }
    }

    // Save updated product
    await product.save();

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(400)
      .send({ message: "Something went wrong while updating the product" });
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

export const getSectionOneProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .sort({ createdAt: -1 }) // Sorting by `createdAt` in ascending order
      .limit(8); // Limiting to 8 products
    // Debugging line
    res.json(products);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Server Error" });
  }
};

export const getSectionTwoProducts = async (req, res) => {
  try {
    const products = await productModel.find().sort({ createdAt: 1 }).limit(4);
    res.json(products);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Server Error" });
  }
};

// * function for pagination products.
export const getkProducts = async (req, res) => {
  const { page = 1, limit = 10, category } = req.query;

  const query = category ? { category } : {};

  const products = await productModel
    .find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const totalProducts = await productModel.countDocuments(query);

  res.json({
    products,
    totalProducts,
  });
};

// * function for sending the products based on the category.

export const getCategoryProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await productModel.find({ category: id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// * route for custom id search for the products

export const searchAdminProducts = async (req, res) => {
  try {
    const { id } = req.body;

    const product = await productModel.find({ id: id });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).send({
      success: "false",
      message: "Internal Server error",
    });
  }
};

// * this method is for showing the suggestion in the search bar
export const getSuggestProducts = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const suggestions = await productModel
      .find({
        name: { $regex: keyword, $options: "i" },
      })
      .select("name")
      .limit(10); // Limit the number of suggestions

    const suggestionList = suggestions.map((product) => product.name);

    res.status(200).json(suggestionList);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server error",
    });
  }
};
