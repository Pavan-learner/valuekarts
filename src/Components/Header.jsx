import React from "react";
import { Link} from "react-router-dom";
import "/src/assets/css/style.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { clearAuth } from "../State/auth_action";
import toast, { Toaster } from "react-hot-toast";
import { RiDashboardFill } from "react-icons/ri";

import { FaBackward } from "react-icons/fa";
import SearchInput from "./forms/SearchInput";


const Header = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [input, setinput] = useState("Looking for Something?");

  const handelLogout = () =>{
    dispatch(clearAuth());
    localStorage.removeItem('auth-Data');
    toast.success("Logout Successfully");
  }

  return (
    <>
      <div className="main-header">
      <Toaster position="top-center" reverseOrder={false} />
        <div className="p-3 text-center border-bottom ">
          <div className="container ">
            <div className="row gy-3">
              {/* <!-- Left elements --> */}
              <div className="col-lg-2 col-sm-4 col-4">
                <Link to={"/"} href="#" className="float-start">
                  {/* <!-- Here we want add logo --> */}
                  <img src="https://monokingproducts.s3.ap-southeast-2.amazonaws.com/logo_03.png" alt="" id="logoimg" />
                </Link>
              </div>
              {/* <!-- Left elements --> */}

              {/* <!-- Center elements --> */}

              <div className="order-lg-last col-lg-5 col-sm-8 col-8">
                <div className="d-flex float-end">
                  {!auth.user ? (
                    <Link
                      to={"/signup"}
                      className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
                    >
                      {" "}
                      <i className="fas fa-user-alt m-1 me-md-2"></i>
                      <p className="d-none d-md-block mb-0">Sign In</p>
                    </Link>
                  ) : (
                    <>
                    <Link
                    to = {'/login'}
                      className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
                      onClick={handelLogout}
                    >
                      {" "}
                      <i className="fas fa-user-alt m-1 me-md-2"></i>
                      <p className="d-none d-md-block mb-0" >Logout</p>
                    </Link>


                     <Link
                    to = {`/dashboard/${auth?.user?.role === 1? 'admin':'user'}`}
                      className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
                    >
                      {" "}
                      <RiDashboardFill />
                      <p className="d-none d-md-block mb-0" >Dashboard</p>
                    </Link>
                    
                    </>
                  )}

                  {/* <a
                    href="#"
                    className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
                  >
                    {" "}
                    <i className="fas fa-heart m-1 me-md-2"></i>
                    <p className="d-none d-md-block mb-0">Wishlist</p>
                  </a> */}

                  <Link
                    to={"/cart"}
                    href="cart.html"
                    className="border rounded py-1 px-3 nav-link d-flex align-items-center"
                  >
                    <i className="fas fa-shopping-cart m-1 me-md-2"></i>
                    <p className="d-none d-md-block mb-0">
                      My cart({cartItems.length})
                    </p>
                  </Link>
                </div>
              </div>
              {/* <!-- Center elements --> */}

              {/* <!-- Right elements --> */}
             <SearchInput/>
              {/* <!-- Right elements --> */}
            </div>
          </div>
        </div>

        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
          <div className="container justify-content-start justify-content-md-between">
            <div
              className="btn btn-primary  mb-3 d-lg-none"
              type="button"
              data-toggle="collapse"
              data-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#staticBackdrop"
                aria-controls="staticBackdrop"
              >
               
                <i className="fas fa-bars"></i>
              </button>
              <div
                className="offcanvas offcanvas-start"
                data-bs-backdrop="static"
                tabIndex="-1"
                id="staticBackdrop"
                aria-labelledby="staticBackdropLabel"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="staticBackdropLabel">
                    Menu
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <div>
                    <div>
                      <ul
                        style={{
                          listStyleType: "none",
                        }}
                      >
                        <li>
                          <Link
                            to={`/`}
                            type="button"
                            className="btn btn-primary nav-item bg-light text-dark"
                          >
                            Home
                          </Link>
                        </li>

                        <li>
                          <Link
                            to={"/aboutus"}
                            type=" button"
                            className="btn btn-primary nav-item bg-light text-dark mt-2"
                          >
                            About us
                          </Link>
                        </li>

                        <li>
                          <Link
                            to="/order-tracking"
                            type=" button"
                            className="btn btn-primary nav-item bg-light text-dark mt-2"
                          >
                            Order and Tracking
                          </Link>
                        </li>

                        <li>
                          <div className=" btn-group" role="group">
                            <button
                              type="button"
                              className="btn btn-primary dropdown-toggle bg-light text-dark mt-2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Others
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <a
                                  className="dropdown-item bg-light text-dark"
                                  href="#"
                                >
                                  Services
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item bg-light text-dark"
                                  href="#"
                                >
                                  Contact Us
                                </a>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="collapse navbar-collapse d-lg-block"
              id="navbarLeftAlignExample"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <div
                  className="btn-group tool-bar-hover"
                  role="group"
                  aria-label="Button group with nested dropdown "
                >
                  <Link
                    to={`/`}
                    type="button"
                    className="btn btn-primary nav-item bg-light text-dark"
                  >
                    Home
                  </Link>
                  <Link
                    to={"/aboutus"}
                    type=" button"
                    className="btn btn-primary nav-item bg-light text-dark tool-bar-hover"
                  >
                    About us
                  </Link>
                  <Link
                    to={"/order-tracking"}
                    type=" button"
                    className="btn btn-primary nav-item bg-light text-dark tool-bar-hover"
                  >
                    Order and Tracking
                  </Link>

                  <div className=" btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-primary dropdown-toggle bg-light text-dark"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Others
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          className="dropdown-item bg-light text-dark"
                          href="#"
                        >
                          Services
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item bg-light text-dark"
                          href="#"
                        >
                          Contact Us
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      {/* <!-- Jumbotron --> */}

      {/* Tool Bar */}
    </>
  );
};
export default Header;
