import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { url } from "../Components/backend_link/data";
import Loader from "../Components/Loading/Loader";
import DeletePopup from "../Components/popups/DeletePopup";
import ReturnPopup from "../Components/popups/ReturnPopup";

const OrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);

  const auth = useSelector((state) => state.auth);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/api/v2/order/get-orders`, {
        headers: {
          Authorization: auth.token,
        },
      });
      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("An error occurred while fetching orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      fetchOrders();
    }
  }, [auth?.token]);

  const getStatusClass = (status) => {
    const statusClasses = {
      Processing: "text-warning",
      Shipped: "text-info",
      Delivered: "text-success",
      Cancelled: "text-danger",
      Default: "text-secondary",
    };
    return statusClasses[status] || statusClasses.Default;
  };

  const getProgressPercentage = (status) => {
    const progressPercentages = {
      Processing: "25%",
      Shipped: "50%",
      Delivered: "100%",
      Cancelled: "0%",
    };
    return progressPercentages[status] || "0%";
  };

  const handleShowModal = (type) => {
    if (type === "delete") {
      setShowDeleteModal(true);
    } else if (type === "return") {
      setShowReturnModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setShowReturnModal(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mt-5 mb-5">
      {orders.length > 0 ? (
        <>
          <h2 className="mb-4 text-center">Order Tracking</h2>
          {orders.map((order) => (
            <div key={order._id} className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Order ID: {order._id}</h5>
                <p className={`card-text ${getStatusClass(order.status)} mb-0`}>
                  Status: {order.status} <i className="bi bi-truck ms-2"></i>
                </p>
                <p className="card-text">
                  {order.status !== "Cancelled" &&
                    order.status !== "Delivered" && (
                      <span>Estimated Delivery: 4 to 5 days</span>
                    )}
                </p>

                <div className="progress mb-3">
                  <div
                    className={`progress-bar ${getStatusClass(order.status)}`}
                    role="progressbar"
                    style={{ width: getProgressPercentage(order.status) }}
                    aria-valuenow={parseInt(
                      getProgressPercentage(order.status)
                    )}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {getProgressPercentage(order.status)}
                  </div>
                </div>

                <h5 className="mt-4">Product:</h5>
                <ul className="list-group">
                  {order.products.map((item) => (
                    <li key={item._id} className="list-group-item">
                      {item.name}
                    </li>
                  ))}
                </ul>

                {order.status === "Cancelled" ? (
                  <h3 className="text-center mt-4">Order cancelled</h3>
                ) : (
                  <>
                    {order.status === "Delivered" && (
                      <button
                        className="btn btn-danger mt-2 align-self-end"
                        onClick={() => handleShowModal("return")}
                      >
                        Return
                      </button>
                    )}

                    {(order.status !== "Return" &&
                      order.status !== "Returned" &&
                      order.status !== "Cancelled" &&
                      order.status !== "Delivered") && (
                      <button
                        className="btn btn-danger mt-2 align-self-end"
                        onClick={() => handleShowModal("delete")}
                      >
                        Cancel Order
                      </button>
                    )}
                  </>
                )}

                {order.status === "Return" && (
                  <h3 className="text-center mt-4">
                    Your request for return is under process
                  </h3>
                )}

                {order.status === "Returned" && (
                  <h3 className="text-center mt-4">
                    Your order has been returned
                  </h3>
                )}

                {showDeleteModal && (
                  <DeletePopup
                    show={showDeleteModal}
                    handleClose={handleCloseModal}
                    id={order._id}
                  />
                )}

                {showReturnModal && (
                  <ReturnPopup
                    show={showReturnModal}
                    handleClose={handleCloseModal}
                    id={order._id}
                  />
                )}
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {auth?.user ? (
            <h3 className="text-center">No orders found</h3>
          ) : (
            <h3 className="text-center">
              Please Signup/Login to View your order status
            </h3>
          )}
        </>
      )}
    </div>
  );
};

export default OrderTracking;
