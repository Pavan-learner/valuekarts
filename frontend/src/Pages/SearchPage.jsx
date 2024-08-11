import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import Loader from "../Components/Loading/Loader";

import Loader from '../Components/Loading/Loader';


const SearchPage = () => {
  const results = useSelector((state) => state.search.results);
  const status = useSelector((state) => state.search.status);
  const error = useSelector((state) => state.search.error);

  const cartItems = useSelector((state) => state.cart.cart);
  const [loading, setLoading] = useState(false)

  
  useEffect(() => {
    setLoading(true)
    
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  
  }, [])
  

  if (loading) {
    return <>
        <Loader/>
    </>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }


  console.log(results)

  return (
    <div>
      <div className="container my-5">
        <h2 className="text-center mb-4 mt-4">Search Results</h2>
        {results.length === 0 ? (
          <div>No results found.</div>
        ) : (
          <div className="row rec-products products">
            {results.map((product) => (
              <>
                <div
                  className="col-lg-3 col-md-6 col-sm-6 my-card-2 "
                  key={product._id}
                >
                  <div className="card my-2 shadow-0 product-img card-action my-card">
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={product.imgLink[2]}
                        className="card-img-top rounded-2 p-4 w-100 h-100 object-fit-cover p-4"
                      />
                    </Link>
                    <div className="card-body p-0 pt-2">
                      <h5 className="card-title fw-bold">Rs.{product.price}</h5>
                      <p className="card-text mb-0 text-truncate">{product.name}</p>
                      {/* <p>Details:{item.description}</p> */}

                      <div className="buttons">
                        {cartItems.some((p) => p._id === product._id) ? (
                          <button
                            type="button"
                            className="bg-danger m-1 btn btn-link  text-light fw-bold border border-danger custom-button"
                            //   onClick={() => {
                            //     dispatch(removeFromCart(item));
                            //     removeCart(item);
                            //   }}
                          >
                            Remove from Cart
                          </button>
                        ) : (
                          <div className="buttons">
                            <button
                              className="m-1 btn btn-link bg-light text-primary fw-bold border border-primary custom-button "
                              onClick={() => {
                                //   dispatch(addToCart(item));
                                // addCart(item);
                              }}
                            >
                              Add to Cart
                            </button>

                            <button
                              className="m-1 btn btn-link bg-primary text-light fw-bold border border-primary custom-button"
                              // onClick={() => handelbuyNoww(item)}
                            >
                              Buy Now
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
