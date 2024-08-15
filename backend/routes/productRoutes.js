import express from "express";
import { isAdmin, requireSignin } from "../middleware/authMiddleware.js";
import formidable from 'express-formidable';
import { createProduct, deleteProduct, getCategoryProducts, getkProducts, getProductPhoto, getProducts, getSectionOneProducts, getSectionTwoProducts, getSingleProduct, searchProducts, updateProduct } from "../controllers/productController.js";

const router = express.Router();    

router.post('/create-product',requireSignin,isAdmin,formidable() ,createProduct);
router.get('/get-products',getProducts);
router.get('/get-single-product/:id',getSingleProduct);
router.get('/get-product-photo/:pid',getProductPhoto);

router.put('/update-product/:id',requireSignin,isAdmin,formidable() ,updateProduct);

router.delete('/delete-product/:id',requireSignin,isAdmin, deleteProduct);



// * for searching of the product

router.get('/search/:keyword',searchProducts);


// * fetching the products based on section
router.get('/section-one',getSectionOneProducts);
router.get('/section-two',getSectionTwoProducts);


// * fetching the products for pagination
router.get('/get-k-products',getkProducts);


// * fetching the product based on category
router.get('/get-product-by-category/:id',getCategoryProducts);
export default router;