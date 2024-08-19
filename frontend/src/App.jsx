import React, { useEffect, useState } from "react";

import Home from "./Pages/Home";
import Signup from "./Pages/auth/Signup";
import ProductPage from "./Pages/ProductPage";
import Cart from "./Pages/Cart";
import ProductView from "./Pages/ProductView";
import Checkout from "./Pages/Checkout";
import Profile from "./Pages/user/Profile";
import OrderConfirmed from "./Components/OrderConfirmed";

// ! When we depoly our app this should be removed.
import Testing from "./Pages/Testing";

import Login from "./Pages/auth/Login";
import OrderTracking from "./Pages/OrderTracking";
import UserPrivate from "./Components/Private_Routes/UserPrivate";
import User_Dashboard from "./Pages/user/User_Dashboard";
import { Ride } from "./Pages/ride/Ride";
import Admin_Private from "./Components/Private_Routes/Admin_Private";
import CreateProduct from "./Pages/admin/Products/CreateProduct";
import ProductList from "./Pages/admin/Products/ProductList";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import Loader from "./Components/Loading/Loader";
import Layout from "./Components/Layout";
import Event from "./Pages/event/Event";
import CategoryList from "./Pages/admin/Cateogry/CategoryList";
import CreateCategory from "./Pages/admin/Cateogry/CreateCategory";
import UpdateCateogry from "./Pages/admin/Cateogry/UpdateCategory";
import DeleteCategory from "./Pages/admin/Cateogry/DeleteCategory";
import OrderList from "./Pages/admin/orders/OrderList";
import DeleteProduct from "./Pages/admin/Products/DeleteProduct";
import UpdateProduct from "./Pages/admin/Products/UpdateProduct";
import Labour from "./Pages/labour/Labour";
import SearchPage from "./Pages/SearchPage";
import OrderDetail from "./Pages/admin/orders/OrderDetails";
import EventList from "./Pages/admin/events/EventList";
import CreateEvent from "./Pages/admin/events/CreateEvent";
import UpdateEvent from "./Pages/admin/events/UpdateEvent";

import { useDispatch } from "react-redux";
import { setAuth } from "./State/auth_action";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateVechicle from "./Pages/admin/vechicle/CreateVechicle";
import UpdateVechicle from "./Pages/admin/vechicle/UpdateVechicle";
import ReadVechicle from "./Pages/admin/vechicle/ReadVechicle";
import CategoryBased from "./Pages/CategoryBased";
import SectionLinks from "./Pages/admin/sections/SectionLinks";
import LinkTable from "./Pages/admin/sections/LinkTable";
import LabourList from "./Pages/admin/labour/LabourList";
import CreateLabour from "./Pages/admin/labour/CreateLabour";
import UpdateLabour from "./Pages/admin/labour/UpdateLabour";

function App() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("auth-Data");
    if (data) {
      const parseData = JSON.parse(data);
      dispatch(
        setAuth({
          user: parseData.user,
          token: parseData.token,
        })
      );
    }
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Router>
          {/* <Header /> */}

          <Routes>
            // * Private Routes for user
            <Route
              path="dashboard"
              element={
                <Layout>
                  <UserPrivate />
                </Layout>
              }
            >
              <Route path="user" element={<User_Dashboard />} />
              <Route path="user/profile" element={<Profile />} />
              <Route path="user/order-tracking" element={<OrderTracking />} />
            </Route>
            // * Private routes for admin
            <Route path="dashboard" element={<Admin_Private />}>
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/order-tracking" element={<OrderList />} />
              // ! Category routes
              <Route path="admin/category-list" element={<CategoryList />} />
              <Route
                path="admin/create-category"
                element={<CreateCategory />}
              />
              <Route
                path="admin/edit-category/:slug"
                element={<UpdateCateogry />}
              />
              <Route
                path="admin/delete-category/:id"
                element={<DeleteCategory />}
              />
              // ! Product routes
              <Route path="admin/product-list" element={<ProductList />} />
              <Route path="admin/create-product" element={<CreateProduct />} />
              <Route
                path="admin/update-product/:id"
                element={<UpdateProduct />}
              />
              <Route
                path="admin/delete-product/:id"
                element={<DeleteProduct />}
              />
              // ! Orders
              <Route path="admin/orders" element={<OrderList />} />
              <Route
                path="admin/orders/order-detail/:id"
                element={<OrderDetail />}
              />
              // ! Event
              <Route path="admin/create-event" element={<CreateEvent />} />
              <Route path="admin/event-list" element={<EventList />} />
              <Route path="admin/update-event/:id" element={<UpdateEvent />} />

              // ! Vechicle
              <Route
                path="admin/create-vehicle"
                element={<CreateVechicle />}
              />
              <Route
                path="admin/update-vehicle/:id"
                element={<UpdateVechicle />}
              />
              
              <Route path="admin/vehicle-list" element={<ReadVechicle />} />


              // ! Section Links
              <Route path = 'admin/create-link' element = {<SectionLinks/>} />
              <Route path = 'admin/section-links' element = {<LinkTable/>} />


              // ! Labour
              <Route path="admin/labour-list" element={<LabourList />} />
              <Route path = "admin/create-labour" element = {<CreateLabour/>} />
              <Route path = 'admin/update-labour/:id' element = {<UpdateLabour/>} />


            </Route>

            // * Public Routes
            <Route
              path="/category-products/:id"
              element={
                <Layout>
                  <CategoryBased />
                </Layout>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/product/:id"
              element={
                <Layout>
                  <ProductPage />
                </Layout>
              }
            />
            <Route
              path="/cart"
              element={
                <Layout>
                  <Cart />
                </Layout>
              }
            />
            <Route
              path="/productView"
              element={
                <Layout>
                  <ProductView />
                </Layout>
              }
            />
            <Route
              path="/checkout"
              element={
                <Layout>
                  <Checkout />
                </Layout>
              }
            />
            <Route
              path="/orderConfirmed"
              element={
                <Layout>
                  <OrderConfirmed />
                </Layout>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/book-ride"
              element={
                <Layout>
                  <Ride />
                </Layout>
              }
            />
            <Route
              path="/event"
              element={
                <Layout>
                  <Event />
                </Layout>
              }
            />
            <Route
              path="/order-tracking"
              element={
                <Layout>
                  <OrderTracking />
                </Layout>
              }
            />
            <Route
              path="/urban-services"
              element={
                <Layout>
                  <Labour />{" "}
                </Layout>
              }
            />
            <Route
              path="/search"
              element={
                <Layout>
                  <SearchPage />{" "}
                </Layout>
              }
            />
            {/* These path for my testing purpose */}
            <Route
              path="/testing"
              element={
                <Layout>
                  <Testing />
                </Layout>
              }
            />
          </Routes>

          {/* <Footer /> */}
        </Router>
      )}
    </>
  );
}

export default App;
