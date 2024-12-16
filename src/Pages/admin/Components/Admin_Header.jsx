import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TfiMenu } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../../../State/auth_action";
import toast, { Toaster } from "react-hot-toast";

const Admin_Header = () => {
    
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handelLogout = () => {
    setLoading(true);

    setTimeout(() => {
      dispatch(clearAuth());
      localStorage.removeItem("auth-Data");
      setLoading(false);
      toast.success("Logout Successfully");

      navigate("/login");
    }, 1000);
  };

  return (
    <div>
    <Toaster position="top-center" reverseOrder={false} />
    <header>
      <nav
        id="main-navbar"
        className="navbar navbar-expand-lg navbar-light bg-white fixed-top mx-auto"
      >
        <div className="container-fluid">
          <Link
            to={"/dashboard/admin"}
            className="navbar-brand text-primary"
            href="#"
          >
            MonoKing
          </Link>
  
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <TfiMenu />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to={"/dashboard/admin/product-list"}
                  className="nav-link text-black"
                >
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/dashboard/admin/category-list"}
                  className="nav-link text-black"
                >
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/dashboard/admin/event-list"}
                  className="nav-link text-black"
                >
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to={"/dashboard/admin/vehicle-list"}
                  className="nav-link text-black"
                >
                  Vehicles
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to={"/dashboard/admin/labour-list"}
                  className="nav-link text-black"
                >
                  Labour
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to={"/dashboard/admin/create-link"}
                  className="nav-link text-black"
                >
                  Section Links
                </Link>
              </li>
             
            </ul>
            <div className="d-flex align-items-center">
              <form className="d-none d-md-flex input-group w-auto my-auto">
                <input
                  autoComplete="off"
                  type="search"
                  className="form-control rounded"
                  placeholder='Search (ctrl + "/" to focus)'
                  style={{ minWidth: 225 }}
                />
                <span className="input-group-text border-0">
                  <i className="fas fa-search" />
                </span>
              </form>
              <div className="dropdown ms-3">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user" />
                </button>
                <ul className="dropdown-menu cursor-pointer">
                  <li onClick={handelLogout} className="dropdown-item cursor-pointer">
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
  
  );
};

export default Admin_Header;
