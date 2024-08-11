import React from "react";
import { Button, Col, FormControl, Form } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { decreaseQty, increaseQty, removeFromCart } from "../State/cart_actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";


const CartProduct = ({ prod }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="row gy-3 mb-4">
        <div className="col-lg-5">
          <div className="me-lg-5">
            <div className="d-flex">
              <img
                src={prod.imgLink[2]}
                className="border rounded me-3"
                style={{ width: "96px", height: "96px" }}
              />

              <div className="">
                <Link to ={`/product/${prod._id}`} className="nav-link text-dark font-weight-bold">
                  {prod.name}
                </Link>
                <p className="text-muted mb-0 text-wrap " style={{
                  fontSize: "12px",
                }}>{prod.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
          <div className="sumAmount">
            {/* <text className="h6">The sum = ${sum}</text> <br /> */}
            <small className="text-muted text-nowrap">
              {" "}
              Rs.{prod.price} / per item{" "}
            </small>
          </div>
        </div>

        <Col md={2}>


        <button
            className="btn btn-light bg-light font-weight-bolder fs-6"
            onClick={() => dispatch(increaseQty(prod))}
          >
            +
          </button>
          <span className="fs-5 my-3">{prod.qty}</span>
        <button
            className="btn btn-light bg-light font-weight-bolder fs-6" 
            onClick={() => dispatch(decreaseQty(prod))}
          >
            -
          </button>
 
        </Col>

        <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
          <div className="float-md-end">
            {/* <a href="#" className="btn btn-light border text-danger icon-hover-danger" onclick = "removeItem(${item.id})"> Remove</a>
                      <*/}

            <Col md={2}>
              <Button
                type="button"
                variant="light"
                onClick={() => dispatch(removeFromCart(prod))}
              >
                <AiFillDelete fontSize="20px" />
              </Button>
            </Col>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;