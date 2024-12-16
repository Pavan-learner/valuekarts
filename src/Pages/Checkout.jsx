import React, { useEffect, useState } from "react";
import CheckoutProduct from "../Components/CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearBuy } from "../State/cart_actions";
import Loader from "../Components/Loading/Loader";
import { FaLocationCrosshairs } from "react-icons/fa6";
import toast from "react-hot-toast";
import { url } from "../Components/backend_link/data";

import { MdDelete } from "react-icons/md";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cart);
  const buyItem = useSelector((state) => state.cart.buy);
  const auth = useSelector((state) => state.auth);

  // * These state will store the buy item everytime when the page renders and when the buy button is clicked
  const [buyItems, setBuyItems] = useState(
    buyItem.length > 0 ? buyItem : cartItems
  );

  // * These state is used to manage the total price.
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // * this are the states that are used to get the current location of the user.
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  // * this state is used to get the address of the user.
  const [address, setAddress] = useState("");

  // * this state is used to get the new address of the user.
  const [newAddress, setNewAddress] = useState("");

  //* this state is for manageing the Phone.

  const [phone, setPhone] = useState("");

  // * These state is used to manage the mailing list.
  const [mailItems, setmailItems] = useState([]);

  const [value, setValue] = useState("");

  const [mail, setMail] = useState("");

  useEffect(() => {
    setTotal(
      cartItems.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cartItems]);


  useEffect(() => {
    setTotal(
      buyItems.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [buyItems]);
  // * when this page renders why this page is rendered and which product details i have to send to the seller.
  useEffect(() => {
    if (buyItem.length > 0) {
      setmailItems(buyItems);
    } else {
      setmailItems(cartItems);
    }

    if (auth?.user) {
      getExistingAddress();
    }
  }, []);

  // * this login is for handeling when the is logged on
  const [useExistingAddress, setUseExistingAddress] = useState(false);

  const handleCheckboxChange = (e) => {
    setUseExistingAddress(e.target.checked);
    if (e.target.checked) {
      // Assuming getExistingAddress() fetches the existing address
      const existingAddress = address;
      setNewAddress(existingAddress);
    } else {
      setNewAddress("");
    }
  };

  const getExistingAddress = async () => {
    if (!auth.user) {
      console.log("User is not authenticated");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8080/api/v2/auth/get-user/${auth.user._id}`,
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );
      setAddress(res.data.user.address);
      console.log(res.data.user.address);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async (data) => {
    if (!auth.user) {
      console.log("User is not authenticated");
      return;
    }

    try {
      const res = await axios.put(
        `${url}/api/v2/auth/update-user/${auth.user._id}`,
        {
          address: data.address,
          phone: data.phone,
          email: data.email,
        },
        {
          headers: {
            Authorization: auth.token,
          },
        }
      );

      console.log(res.data.user.phone);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMail = async (data) => {
    try {
      const res = await axios.post(`${url}/api/v2/mail/send-mail`, data);
      console.log("SUCCESS!", res.data);

      if (res.data.success) {
        orderConfirmed();
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(
        "Something went wrong while confirming your order please try again later"
      );
    }
  };

  // * it's an animation screen that confirms the order
  const orderConfirmed = () => {
    navigate("/orderConfirmed");
  };

  // * This function is used to send email to the seller.
  const handelSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const data = {
      name: e.target.user_name.value,
      email: e.target.user_email.value,
      address: e.target.address.value,
      phone: e.target.user_phone.value,
      products: mailItems,
    };

    sendMail(data);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    // * this data is passed because we need to update the user profile.
    let data = {
      address: address,
      phone: phone,
      email: mail,
    };
    updateProfile(data);

    setLoading(true);

    const orderData = {
      products: buyItems.map((productId) => productId._id), // Assuming `productId` is the ID of each product
      buyer: auth.user._id, // Assuming `auth.user` contains the logged-in user's details
      address: address || getExistingAddress(),
      total,
      status: "Not Processed",
    };

    try {
      const res = await axios.post(
        `${url}/api/v2/order/create-order`,
        orderData
      );

      console.log(res.data);
      if (res.data) {
        dispatch(clearBuy());
        await sendMail({
          name: auth.user.name,
          email: auth.user.email || mail,
          address: address || newAddress,
          phone: phone,
          products: mailItems,
        });
        setTimeout(() => {
          setLoading(false);
          orderConfirmed();
        }, 1000);
      }
    } catch (err) {
      toast.error("Order submission failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = () => {
    setValue("");
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // * This function is used to get the address of the user by decoding the cordinates.
  const reverseCode = (latitude, longitude) => {
    axios
      .post(`${url}/api/v2/location/reverse-geocode`, {
        latitude, // Updated to match the expected parameter names
        longitude,
      })
      .then((response) => {
        setAddress(response.data.address);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // * This function is used to get the current location of the user.
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null);
          reverseCode(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };


  const handelDeleteBuyItem  = (id) =>{
    setBuyItems(buyItems.filter((item) => item._id !== id));
  }

  return loading ? (
    <Loader />
  ) : (
    <div>
      <main className="mt-5 pt-4">
        <div className="container">
          <div className="row">
            <div className="col-md-8 mb-4">
              <div className="card p-4">
                {auth?.user ? (
                  <>
                    <div className="container">
                      <div className="row justify-content-center">
                        <div className="col-md-8">
                          <div className="address-form">
                            <h1 className="text-center mb-4">
                              Check your address
                            </h1>

                            <div className="form-group mb-4">
                              <h4>Your Current Address</h4>
                              <p className="border p-2">{address}</p>
                              <div className="form-check mb-4">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="autoSizingCheck"
                                  onChange={handleCheckboxChange}
                                  checked={useExistingAddress}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="autoSizingCheck"
                                >
                                  Use existing address
                                </label>
                              </div>
                            </div>

                            {!useExistingAddress && (
                              <div className="address-fields">
                                <div className="form-group mb-4">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter new Address"
                                    aria-label="Your Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                  />
                                </div>
                                <p
                                  className="text-primary cursor-pointer"
                                  onClick={fetchLocation}
                                  style={{
                                    fontSize: "14px",
                                  }}
                                >
                                  Current location{" "}
                                  <FaLocationCrosshairs className="cursor-pointer" />
                                </p>
                              </div>
                            )}

                            {useExistingAddress && (
                              <div className="existing-address">
                                <p>Your existing address: {address}</p>
                              </div>
                            )}

                            {(auth?.user.phone.startsWith("12345") ||
                              auth?.user.phone === "") && (
                              <div className="form-group mb-4">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Phone Number"
                                  aria-label="Phone Number"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  required
                                />
                              </div>
                            )}

                            {auth?.user.email === null && (
                              <div className="form-group mb-4">
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="Enter your Email"
                                  aria-label="mail"
                                  value={mail}
                                  onChange={(e) => setMail(e.target.value)}
                                  required
                                />
                              </div>
                            )}

                            <h4 className="mt-4">Payment</h4>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="flexCheckDefault"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexCheckDefault"
                              >
                                Cash On Delivery
                              </label>
                            </div>

                            <hr />

                            <div className="text-center">
                              <button
                                className="btn btn-primary"
                                type="submit"
                                onClick={handleOrderSubmit}
                              >
                                Place Order
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <span>
                      <h4>Not Registered?</h4>
                      <Link to={"/signup"}>Signup/Login</Link>
                    </span>
                    <h2 className="my-2 text-center">Checkout form</h2>
                    <form onSubmit={handelSubmit}>
                      <div className="row mb-3">
                        <p>Name</p>
                        <div className="form-outline">
                          <input
                            type="text"
                            name="user_name"
                            className="form-control"
                            placeholder="Your Name"
                            aria-label="Your Name"
                            value={value}
                            onFocus={handleFocus}
                            onChange={handleChange}
                            style={{ border: "1px solid #ccc" }}
                            required
                          />
                        </div>
                      </div>
                      <p className="mb-0">Phone Number</p>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          className="form-control"
                          name="user_phone"
                          placeholder="+91 1234567890"
                          style={{ border: "1px solid #ccc" }}
                          required
                        />
                      </div>
                      <p className="mb-0">Email </p>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          className="form-control"
                          name="user_email"
                          placeholder="youremail@example.com"
                          aria-label="youremail@example.com"
                          style={{ border: "1px solid #ccc" }}
                          required
                        />
                      </div>
                      <p className="mb-0">Address</p>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="form-control"
                          name="address"
                          placeholder="1234 Main St"
                          aria-label="1234 Main St"
                          style={{ border: "1px solid #ccc" }}
                          required
                        />
                      </div>

                      <p
                        className="text-primary cursor-pointer fs-8"
                        onClick={fetchLocation}
                        style={{
                          fontSize: "14px",
                        }}
                      >
                        Current location <FaLocationCrosshairs />
                      </p>
                      <div className="row">
                        <div className="col-lg-4 col-md-12 mb-4">
                          <p className="mb-0">Country</p>
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="India"
                              defaultValue={"India"}
                              aria-label="India"
                              style={{ border: "1px solid #ccc" }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-12 mb-4">
                          <p className="mb-0">State</p>
                          <div className="form-outline mb-4">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Karnataka"
                              aria-label="Karnataka"
                              defaultValue={"Karnataka"}
                              style={{ border: "1px solid #ccc" }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-12 mb-4">
                          <p className="mb-0">Zip</p>
                          <div className="form-outline">
                            <input
                              type="text"
                              className="form-control"
                              style={{ border: "1px solid #ccc" }}
                              // value = {"560091"}
                              defaultValue={"560091"}
                            />
                          </div>
                        </div>
                      </div>
                      <hr />
                      <h4>Payment</h4>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Cash On Delivery
                        </label>
                      </div>
                      <hr />
                      <button className="btn btn-primary" type="submit">
                        Place Order
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your cart</span>
                <span className="badge rounded-pill badge-primary">
                  {cartItems.length}
                </span>
              </h4>
              {buyItems.length > 0
                ? buyItems.map((item) => (
                    <>
                      <div
                        className="d-flex justify-content-between align-items-center"
                        key={item._id}
                      >
                        <CheckoutProduct prod={item} />
                        <div className="delete-icon-container">
                          <MdDelete className="cursor-pointer text-danger delete-icon" onClick={(e) => {
                             e.stopPropagation();
                            handelDeleteBuyItem(item._id)
                            }} />
                        </div>
                      </div>
                    </>
                  ))
                : cartItems.map((item) => (
                    <>
                      <CheckoutProduct prod={item} key={item._id} />
                    </>
                  ))}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (Rs)</span>
                <strong>{total}</strong>
              </li>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
