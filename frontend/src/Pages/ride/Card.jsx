import React, { useEffect, useState,  } from "react";


const Card = ({ title, kmrate, bata }) => {


  return (
    <>
      <div className="row">
        <div
          className="col-lg-4 w-100"
          style={{
            backgroundColor: "#f8f9fa",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h4 className="text-center fw-bold">{title}</h4>
          <p>* Per KM {kmrate}.Rs</p>
          <p>* Per day Min KM 300KM</p>
          <p>* Per day driver bata {bata}.Rs</p>
          <p>* Some Additional Charges</p>
          <p>
            (Toll Charge) (Parking Charge) (Working hours is from 6:00 AM :
            10:00 PM Upon Working hours there is extra charrge for that)
          </p>

          <div className="images">
            <img
              src="https://imgs.search.brave.com/9Lj4-VoARMtZ4lS4jVNOSWLQYCHLn3KOkPjREw-WW30/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy84/Lzg0L1RveW90YV9F/dGlvc19WYWxjb19h/a2FfRXRpb3NfTGl2/YV8ocmVhcikuSlBH"
              alt=""
              style={{
                width: "200px",
                height: "200px",
                margin: "0.5vw",
                objectFit: "contain",
              }}
            />

            <img
              src="https://imgs.search.brave.com/9Lj4-VoARMtZ4lS4jVNOSWLQYCHLn3KOkPjREw-WW30/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy84/Lzg0L1RveW90YV9F/dGlvc19WYWxjb19h/a2FfRXRpb3NfTGl2/YV8ocmVhcikuSlBH"
              alt=""
              style={{
                width: "200px",
                height: "200px",
                // margin: "1vw",
                margin: "0.5vw",

                objectFit: "contain",
              }}
            />

            <img
              src="https://imgs.search.brave.com/9Lj4-VoARMtZ4lS4jVNOSWLQYCHLn3KOkPjREw-WW30/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy84/Lzg0L1RveW90YV9F/dGlvc19WYWxjb19h/a2FfRXRpb3NfTGl2/YV8ocmVhcikuSlBH"
              alt=""
              style={{
                width: "200px",
                height: "200px",
                // margin: "1vw",
                margin: "0.5vw",

                objectFit: "contain",
              }}
            />
          </div>

        </div>
      </div>
    </>
  );
};

export default Card;
