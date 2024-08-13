import React from "react";
import { Link, useNavigate } from "react-router-dom";

// * These module for giving an alert after adding to the cart
import toast, { Toaster } from "react-hot-toast";

// Redux methods
import { useDispatch, useSelector } from "react-redux";
import { addToCart, buyNow, removeFromCart } from "../State/cart_actions";

const SingleProduct = ({ item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();

  const addCart = (item) =>
    toast.success(`Item added to cart`, {
      duration: 1000,
    });

  const removeCart = (item) =>
    toast.error(`Removed from to cart`, {
      duration: 1000,
    });

  const handelbuyNoww = (item) => {
    // dispatch(buyNow(item));
    dispatch(addToCart(item));
    navigate("/checkout");
  };

  // console.log(cart);
  return (
    <>
      <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={item._id}>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
          <Link to={`/product/${item._id}`} className="text-decoration-none">
            <div className="my-card-img-container p-3 pb-3">
              {(item.imgLink) && (
                <img
                  src={item.imgLink[0]}
                  alt={item.name}
                  className="my-card-img"
                />
              )}
            </div>
          </Link>
          <div className="card-body my-card-body">
            <h5 className="card-title fw-bold text-truncate mb-2 my-card-title">
              Rs.{item.price}
            </h5>
            <p className="card-text text-truncate mb-3 my-card-text">
              {item.name}
            </p>

            <div className="d-flex gap-2">
              {cartItems.some((p) => p._id === item._id) ? (
                <button
                  type="button"
                  className="btn btn-danger btn-sm w-100 my-card-button p-2"
                  onClick={() => {
                    dispatch(removeFromCart(item));
                    removeCart(item);
                  }}
                >
                  Remove from Cart
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-outline-primary btn-sm w-50 my-card-button p-2"
                    onClick={() => {
                      dispatch(addToCart(item));
                      addCart(item);
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-primary btn-sm w-50 my-card-button"
                    onClick={() => handelbuyNoww(item)}
                  >
                    Buy Now
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
