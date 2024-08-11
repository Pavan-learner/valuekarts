import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Components/Loading/Loader";
import "./admin.css";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../../State/auth_action";
import toast, { Toaster } from "react-hot-toast";
import { MdDeliveryDining } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { TfiMenu } from "react-icons/tfi";
import Admin_Header from "./Components/Admin_Header";

const AdminDashboard = () => {
  const [Loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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
    <>
      {Loading ? (
        <Loader />
      ) : (
        <div>
          <Toaster />

         <Admin_Header/>

          <main
            style={{
              marginTop: "58px",
            }}
          >
            <div className="container pt-4">
              <section>
                <div className="row">
                  <div className="col-xl-3 col-sm-6 col-12 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between px-md-1">
                          <div className="align-self-center">
                            {/* <i className="fas fa-pencil-alt text-info fa-3x" /> */}
                            <MdEventAvailable className="fas fa-pencil-alt text-info fa-3x" />
                          </div>
                          <div className="text-end">
                            <h3>0</h3>
                            <p className="mb-0">Event Bookings</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-6 col-12 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between px-md-1">
                          <div className="align-self-center">
                            <i className="far fa-comment-alt text-warning fa-3x" />
                          </div>
                          <div className="text-end">
                            <h3>0</h3>
                            <p className="mb-0">User Reviews</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 col-sm-6 col-12 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between px-md-1">
                          <div className="align-self-center">
                            <i className="fas fa-map-marker-alt text-danger fa-3x" />
                          </div>
                          <div className="text-end">
                            <h3>0</h3>
                            <p className="mb-0">Total Orders Delivered</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 col-sm-6 col-12 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between px-md-1">
                          <div>
                            <h3 className="">0</h3>
                            <p className="mb-0">Total Users</p>
                          </div>
                          <div className="align-self-center">
                            <i className="far fa-user text-success fa-3x" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-3 col-sm-6 col-12 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between px-md-1">
                          <div>
                            <h3 className="text-danger">0</h3>
                            <p className="mb-0">Delivery Partners</p>
                          </div>
                          <div className="align-self-center">
                            {/* <i className="fas fa-rocket text-danger fa-3x" /> */}
                            <MdDeliveryDining className="far fa-user text-success fa-3x" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <div className="row">
                  <div className="col-xl-6 col-md-12 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between p-md-1">
                          <div className="d-flex flex-row">
                            <div className="align-self-center">
                              {/* <i className="fas fa-pencil-alt text-info fa-3x me-4" /> */}
                              <MdProductionQuantityLimits className="fas fa-pencil-alt text-info fa-3x me-4" />
                            </div>
                            <div>
                              <h4>Total Products</h4>
                              <p className="mb-0"></p>
                            </div>
                          </div>
                          <div className="align-self-center">
                            <h2 className="h1 mb-0">0</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-12 mb-4">
                    <Link to = '/dashboard/admin/orders'>

                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between p-md-1">
                          <div className="d-flex flex-row">
                            <div className="align-self-center">
                              <i className="far fa-comment-alt text-warning fa-3x me-4" />
                            </div>
                            <div>
                              <h4>New Orders</h4>
                              <p className="mb-0">Today's Orders</p>
                            </div>
                          </div>
                          <div className="align-self-center">
                            <h2 className="h1 mb-0">0</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    </Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-6 col-md-12 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between p-md-1">
                          <div className="d-flex flex-row">
                            <div className="align-self-center">
                              <h2 className="h1 mb-0 me-4">0</h2>
                            </div>
                            <div>
                              <h4>Total Sales</h4>
                              <p className="mb-0">Monthly Sales Amount</p>
                            </div>
                          </div>
                          <div className="align-self-center">
                            {/* <i className="far fa-heart text-danger fa-3x" /> */}
                            <FcSalesPerformance className="far fa-heart text-danger fa-3x" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
