import React, { useEffect, useState } from 'react'
import { Link, useNavigate,useParams } from "react-router-dom";
import Admin_Header from "../Components/Admin_Header";
import axios from "axios";
import { url } from "../../../Components/backend_link/data";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Backbutton from '../../../Components/Backbutton';

const UpdateProduct = () => {
  const params = useParams();
const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [categoryValue, setCategory2] = useState("");
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setqty] = useState("");
  const [shipping, setShipping] = useState(false);
  const [imageLinks, setImageLinks] = useState([""]);

  const auth = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  console.log(params.id)

  const handleImageLinkChange = (index, value) => {
    const updatedLinks = [...imageLinks];
    updatedLinks[index] = value;
    setImageLinks(updatedLinks);
  };

  const addImageLinkField = () => {
    setImageLinks([...imageLinks, ""]);
  };

  const removeImageLinkField = (index) => {
    const updatedLinks = imageLinks.filter((_, i) => i !== index);
    setImageLinks(updatedLinks);
  };


   // * this object is used to store the existing product data
   const [product, setProduct] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const productData = new FormData();

      productData.append("name", name);
      productData.append("category", categoryValue);
      productData.append("price", price);
      productData.append("description", description);
      productData.append("qty", qty);
      productData.append("shipping", shipping);
      productData.append("photo", photo);
      productData.append("imgLink", JSON.stringify(imageLinks));

      const res = await axios.put(
        `${url}/api/v2/products/update-product/${params.id}`,
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: auth.token,
          },
        }
      );

      if (res.data.success) {
        setTimeout(() => {
          navigate("/dashboard/admin/product-list");
          toast.success(res.data.message);
          setLoading(false);
        }, 1000);
      } else {
        toast.error(res.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get(`${url}/api/v2/category/get-categories`);

      setCategory(res.data.data);
      //   console.log(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, [params.id]);


  const findProduct = async () => {
    try {
      const res = await axios.get(`${url}/api/v2/products/get-single-product/${params.id}`, {
        headers: {
          Authorization: auth.token,
        },
      });
      setProduct(res.data.pd);
      // console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    findProduct();
  }, [params.id]);

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setCategory2(product.category?._id || '');
      setDescription(product.description || '');
      setPrice(product.price || '');
      setqty(product.qty || '');
      setShipping(product.shipping || false);
      setImageLinks(product.imgLink || []);
    }
  }, [product]);

  return (
    <>
      <Admin_Header/>

      <div className="w-75 mx-auto mb-5 mt-5">
      <Backbutton path = {'/dashboard/admin/product-list'}/>
        <h1 className="text-center mb-4">Update Product</h1>
        <span>
          <Link to="/dashboard/admin/products">
            <button className="btn btn-primary mb-3 ">See All</button>
          </Link>
        </span>
        <form className="border p-4 rounded shadow" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Product Category</label>
            <select
              className="form-select"
              value={categoryValue}
              onChange={(e) => setCategory2(e.target.value)}
            >
              <option>Select Category</option>
              {category.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Upload Image</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              className="form-control"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>

          <div className="mb-3">
            {photo && (
              <div>
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product image"
                  className="img-fluid mb-3"
                  style={{ height: "200px", width: "200px" }}
                />
              </div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Product Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Product Price</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Product Quantity</label>
            <input
              type="number"
              className="form-control"
              value={qty}
              onChange={(e) => setqty(e.target.value)}
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="shippingCheck"
              checked={shipping}
              onChange={(e) => setShipping(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="shippingCheck">
              Shipping Available
            </label>
          </div>

          <div className="mb-3">
            <label className="form-label">Additional Image Links</label>
            {imageLinks.map((link, index) => (
              index !== 0 && (
                <div key={index} className="mb-3 d-flex align-items-center">
                <input
                  type="text"
                  className="form-control"
                  value={link}
                  onChange={(e) => handleImageLinkChange(index, e.target.value)}
                  placeholder={`Image Link ${index + 1}`}
                />
                {index > 0 && (
                  <button
                    type="button"
                    className="btn btn-danger ms-2"
                    onClick={() => removeImageLinkField(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
              )
            ))}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={addImageLinkField}
            >
              Add Another Image Link
            </button>
          </div>

          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <button className="btn btn-primary w-[30%]" type="submit">
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default UpdateProduct