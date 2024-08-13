import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addEvent, removeEvent } from "../../State/cart_actions";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PopUp from "../../Components/PopUp";


const Labour_Card = ({item}) => {

  const dispatch = useDispatch();
  const events = useSelector((state) => state.cart.events);
  const [startDate, setStartDate] = useState(new Date());

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

  return (
    <>
      <div className="col-lg-3 col-md-6 col-sm-12 my-card-2" key={item.id}>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="card my-2 shadow-0 product-img card-action my-card">
          <Link to={`/product/${item.id}`}>
            <img
              src={item.imgSrc}
              className="card-img-top rounded-2  w-100"
              alt={item.pname}
              style={{
            
                height: "20vh",
                width: "100%",
                borderRadius: "10px",
                objectFit: "cover",

              }}
            />
          </Link>
          <div className="card-body p-0 pt-2">
            {/* <h5 className="card-title fw-bold">Rs.{item.rate}</h5> */}
            <p className="card-text mb-0">{item.pname}</p>
            {/* <p>Details: {item.description}</p> */}

            <div className="d-flex align-items-center mb-2">
            <label className="me-2 fw-bold">Select Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
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

          <div className="buttons d-flex flex-column align-items-stretch">
            {events.some((p) => p.id === item.id) ? (
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
                <button className="btn btn-light m-1 fw-bold custom-button" onClick={handleShow}>
                  Book Now
                </button>
                {showModal && <PopUp show={showModal} handleClose={handleClose} />}
              </>
            ) : (
              <button className="btn btn-light m-1 fw-bold custom-button" disabled onClick={handleShow}>
                Book Now
              </button>
            )}
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default Labour_Card