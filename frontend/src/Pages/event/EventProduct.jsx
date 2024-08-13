import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvent, removeEvent } from "../../State/cart_actions";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PopUp from "../../Components/PopUp";


const EventProduct = ({ item }) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.cart.events);
  const [startDate, setStartDate] = useState(new Date());

  const [selectedDate, setselectedDate] = useState(new Date());

  const auth = useSelector((state) => state.auth);

  // * for showing pop up model
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => {
    if(auth.token) {
      toast.success('Your Event is Booked Successfully')
    } else {
      setShowModal(true);
    }
  }

  const handleClose = () => setShowModal(false);

  const handelAdd = () => {
    toast.success("Your Event is added to cart");
  };

  const handelRemove = () => {
    toast.success("Your Event is removed from cart");
  };


  console.log(selectedDate);
  return (
    <>
      <div className="col-lg-3 col-md-6 col-sm-12 my-card-2" key={item.id}>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="card my-2 shadow-0 product-img card-action my-card">
          <Link to={`/product/${item._id}`}>
            <img
              src={item.image[0]}
              className="card-img-top rounded-2 p-3 w-100"
              alt={item.name}
              style={{
                height: "200px",
                objectFit: "cover",
                objectPosition: "center",
                cursor: "pointer",
              }}
            />
          </Link>
          <div className="card-body p-0 pt-2">
            <h5 className="card-title fw-bold">Rs.{item.price}</h5>
            <p className="card-text mb-0">{item.name}</p>
            {/* <p>Details: {item.description}</p> */}

            <div className="d-flex align-items-center mb-2 mt-2">
            <label className="me-2 fw-bold">Select Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date)
                setselectedDate(date)
              }}
              className="form-control datepicker-responsive"
              dateFormat="dd/MM/yyyy"
              placeholderText="Select a date"
              popperPlacement="bottom-start"
              popperModifiers={{
                offset: {
                  enabled: true,
                  offset: "5px, 10px"
                },
                preventOverflow: {
                  enabled: true,
                  escapeWithReference: false,
                  boundariesElement: "viewport"
                }
              }}
            />
          </div>

          <div className="buttons d-flex  align-items-stretch">
            {events.some((p) => p._id === item._id) ? (
              <button
                type="button"
                className="btn btn-danger m-1 text-light fw-bold border border-danger custom-button"
                onClick={() => {
                  dispatch(removeEvent(item));
                  handelRemove();
                }}
              >
                Remove from Cart
              </button>
            ) : (

                <button
                  className="btn btn-primary m-1 text-light fw-bold border border-primary custom-button"
                  onClick={() => {
                    dispatch(addEvent(item));
                    handelAdd();
                  }}
                >
                  Add to Cart
                </button>
            )}

            {!auth.token ? (
              <>
                <button className="btn btn-light m-1 fw-bold custom-button border border-secondary" onClick={handleShow}>
                  Book Now
                </button>
                {showModal && <PopUp show={showModal} date = {selectedDate} handleClose={handleClose} />}
              </>
            ) : (
              <button className="btn btn-light m-1 fw-bold custom-button border border-secondary" disabled onClick={handleShow}>
                Book Now
              </button>
            )}
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default EventProduct;
