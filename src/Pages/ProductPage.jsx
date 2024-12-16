import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// * These module for giving an alert after adding to the cart
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../State/cart_actions";
import { url } from "../Components/backend_link/data";
import axios from "axios";
import Loader from "../Components/Loading/Loader";

const ProductPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  
  // Redux attributes
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const addcart = (item) =>
    toast.success(`${item.pname} added to cart`, {
      duration: 1000,
    });
  const removefromcart = (item) =>
    toast.error(`${item.pname} Removed from to cart`, {
      duration: 1000,
    });

  useEffect(() => {
    setLoading(true);
    findProduct();
    setTimeout(() => {
      setLoading(false);
    },1000)
  }, [id]);


  const findProduct = async () => {
    try {
      const res = await axios.get(
        `${url}/api/v2/products/get-single-product/${id}`
      );
      setProduct(res.data.pd);
      setSelectedImage(res.data.pd.imgLink[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedImage, setSelectedImage] = useState();


  // console.log(product.imgLink[0]);


  const handelbuyNow = () => {
    dispatch(addToCart(product, 1));
    navigate('/checkout');
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
       <main className="pt-1">
      <div className="container mt-2">
        <div className="row">
          {/* Product Image Gallery */}
          <div className="col-md-6 mb-4">
            <div className="image-container">
              <img
                src={selectedImage}
                className="img-fluid main-image"
                alt={product.title}
              />
            </div>

            {/* Thumbnail Images */}
            <div className="d-flex flex-wrap mt-3">
              {(product.imgLink || []).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="img-thumbnail me-2 mb-2 thumbnail-image"
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="col-md-6 mb-4">
            <div className="p-4">
              {/* Product Tags */}
              <div className="mb-3">
                <span className="badge bg-info me-1">New</span>
                <span className="badge bg-danger me-1">Bestseller</span>
              </div>

              {/* Product Title */}
              <h6 className="mb-3">{product.name}</h6>

              {/* Price and Discount */}
              <p className="lead">
                <span className="text-decoration-line-through me-1">
                  ₹{product.price}
                </span>
                <span>₹{product.price}</span>
              </p>

              {/* Product Description */}
              <h5>Details:</h5>
              <p
                className={`product-description ${
                  isDescriptionExpanded ? "expanded" : ""
                }`}
              >
                {product.description}
              </p>
              <button
                className="btn btn-link p-0"
                onClick={toggleDescription}
              >
                {isDescriptionExpanded ? "Show Less" : "Show More"}
              </button>

              {/* Product Varieties */}
              <div className="mb-4">
                <h5>Varieties:</h5>
                <div className="d-flex flex-wrap">
                  {product?.variety?.length &&
                    product.variety.map((variety, index) => (
                      <span
                        key={index}
                        className="badge bg-secondary me-2 mb-2 variety-badge"
                      >
                        {variety}
                      </span>
                    ))}
                </div>
              </div>

              {/* Add to Cart / Remove from Cart */}
              <div className="d-flex flex-column w-100">
                {cart.some((p) => p._id === product._id) ? (
                  <button
                    type="button"
                    className="btn btn-danger mb-2 w-50"
                    onClick={() => {
                      dispatch(removeFromCart(product));
                    }}
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <>
                    <button
                      className="btn btn-outline-primary mb-2 w-50"
                      onClick={() => {
                        dispatch(addToCart(product));
                      }}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-primary w-50"
                      onClick={() => {
                        handelbuyNow(product);
                      }}
                    >
                      Buy Now
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
};

export default ProductPage;
