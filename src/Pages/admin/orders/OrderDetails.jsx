import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Admin_Header from '../Components/Admin_Header';
import { useParams } from 'react-router-dom';
import Loader from '../../../Components/Loading/Loader';
import { url } from '../../../Components/backend_link/data';

const OrderDetail = () => {
  const { id } = useParams(); // Assuming you're using React Router
  const [order, setOrder] = useState(null);
  const auth = useSelector((state) => state.auth);
  const [user,setUser] = useState({})

//   console.log(id)

  useEffect(() => {
    fetchOrderDetails();
  }, []);


  useEffect(() => {
    if (order && order.buyer) {
      fetchUser(); // Only call fetchUser when order is set and buyer is available
    }
  }, [order]);
  

  const fetchOrderDetails = async () => {
    try {
      const res = await axios.get(`${url}/api/v2/order/get-order-detail/${id}`, {
        headers: {
          Authorization: auth.token,
        },
      });
      setOrder(res.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };
// console.log(order.buyer._id)

  const fetchUser = async () =>{
    try {
        const res = await axios.get(`${url}/api/v2/auth/get-user/${order.buyer._id}`,{
            headers:{
                Authorization:auth.token
            }
        })

        setUser(res.data.user)

    } catch (error) {
        console.log(error)
    }
  }

  if(!order) {
    return <>
        <Loader/>
    </>
  }

  return (
    <div>
      <Admin_Header />
      <div className="container mt-5">
        <h1 className="text-center mb-4 mt-5">Order Details</h1>
        <div className="card p-4">
          <h4>Order ID: {order._id}</h4>
          <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Last Updated:</strong> {new Date(order.updatedAt).toLocaleString()}</p>
          <p><strong>Order Status:</strong> {order.status}</p>
          <p><strong>Total Amount:</strong> ₹{order.total}</p>
          <p><strong>Shipping Address:</strong> {order.address}</p>
          <p><strong>Buyer Info:</strong> {user.name} </p>
          <p><strong>Buyer Phone:</strong> {user.phone} </p>

          <h4 className="mt-4">Products:</h4>
          <ul className="list-group">
            {order.products.map((product, index) => (
              <li key={index} className="list-group-item">
                <p><strong>Product Name:</strong> {product.name}</p>
                <p><strong>Price:</strong> ₹{product.price}</p>
                <p><strong>Quantity:</strong> {product.qty}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
       
    </div>
  );
};

export default OrderDetail;
