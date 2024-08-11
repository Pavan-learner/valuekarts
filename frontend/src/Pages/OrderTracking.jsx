import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { url } from "../Components/backend_link/data";
import Loader from "../Components/Loading/Loader";

const OrderTracking = () => {
  const [orders, setOrders] = useState([]); // Changed to plural 'orders' for consistency

  const auth = useSelector((state) => state.auth);

  console.log(auth.token)

  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/v2/order/get-orders`, {
        headers: {
          Authorization: auth.token, // Ensure proper token format
        },
      });

      console.log("Orders fetched successfully:", res.data);
      setOrders(res.data); // Store fetched orders in state
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("An error occurred while fetching orders");
    }
  };

  const handleCancelOrder = async (id) => {
    setLoading(true);

    console.log("Order ID:", id);
    try {
      const response = await axios.put(
          `${url}/api/v2/order/cancel-order/${id}`,
          {
              headers: {
                Authorization: auth?.token
              }
          }
      );

      toast.success(response.data.message);

      setTimeout(() => {
        
        fetchOrders();
        setLoading(false);
      }, 1000);

  } catch (error) {
      console.error("Error canceling the order:", error.response || error);
      toast.error("Failed to cancel the order.");
      setLoading(false);
  }
  };

  useEffect(() => {
    if (auth?.token) {
      fetchOrders();
    }
  }, []); // Ensure it runs only once

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "text-warning";
      case "Shipped":
        return "text-info";
      case "Delivered":
        return "text-success";
      default:
        return "text-secondary";
    }
  };


  if(loading) {
    return <Loader/>
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
                  Status: {order.status}
                  <i className="bi bi-truck ms-2"></i>
                </p>
                <p className="card-text">
                  Estimated Delivery: {order.estimatedDelivery}
                </p>
                <div className="progress mb-3">
                  <div
                    className={`progress-bar ${getStatusClass(order.status)}`}
                    role="progressbar"
                    style={{ width: `10%` }} // This might need to be adjusted based on real progress
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    10%
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
                <button
                  className="btn btn-danger mt-3"
                  onClick={() => handleCancelOrder(order._id)}
                >
                  Cancel
                </button>
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
