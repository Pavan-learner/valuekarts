import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../State/cart_actions";

import toast, { Toaster } from "react-hot-toast";

const Grid_Product = ({ item }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  const addCart = (item) =>
    toast.success(`added to cart`, {
      duration: 1000,
    });
  const removeCart = (item) =>
    toast.error(`Removed from to cart`, {
      duration: 1000,
    });

  const handelbuyNoww = (item) => {
    dispatch(buyNow(item));
    navigate("/checkout");
  };

  // console.log(item);

  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-6 d-flex">
        <div className="card w-100 my-2 shadow-2-strong">
          <div className="my-card-img-container">
            <Link to={`/product/${item._id}`}>
              <img
                src={item.imgLink[2]}
                className="card-img-top rounded-2  w-100 h-100 img-fluid"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  maxWidth: "100%",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </Link>
          </div>
          <div className="card-body d-flex flex-column">
            <div className="d-flex flex-row">
              <h5 className="mb-1 me-1">Rs.{item.price}</h5>
              <span className="text-danger">
                <s>Rs.3000</s>
              </span>
            </div>
            <p className="card-text text-truncate">{item.name}</p>
            <div className="card-footer d-flex align-items-end px-0 pb-0 mt-auto">
              <div className="buttons">
                {cartItems.some((p) => p._id === item._id) ? (
                  <button
                    type="button"
                    className="bg-danger m-1 btn btn-link  text-light fw-bold border border-danger custom-button"
                    onClick={() => {
                      dispatch(removeFromCart(item));
                      removeCart(item);
                    }}
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <div className="buttons">
                    <button
                      className="m-1 btn btn-link bg-light text-primary fw-bold border border-primary custom-button "
                      onClick={() => {
                        dispatch(addToCart(item));

                        addCart(item);
                      }}
                    >
                      Add to Cart
                    </button>

                    <button
                      className="m-1 btn btn-link bg-primary text-light fw-bold border border-primary custom-button"
                      onClick={() => handelbuyNoww(item)}
                    >
                      Buy Now
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Grid_Product;
