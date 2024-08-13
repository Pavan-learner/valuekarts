import React from "react";

const CheckoutProduct = ({prod}) => {
  // console.log(prod.img)
  return (
    <>
      <ul className="list-group mb-3">
        <li className="list-group-item d-flex justify-content-between">
          <img src={prod.imgLink[0]} alt=""  style={{
            width: "100px",
            height: "100px",
            objectFit: "contain",
            margin: "auto",
            borderRadius: "10px",
            padding: "10px",
          }}/>
          <div>
            <h6 className="my-0">{prod.name}</h6>
          </div>
        </li>
      </ul>
    </>
  );
};

export default CheckoutProduct;
