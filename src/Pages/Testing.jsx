import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loading/Loader";
import CountDown from "../Components/timer/CountDown";
import Loader_2 from "../Components/Loading/Loader_2";



const Testing = () => {





  return (
    <>
      <div className="slider-container">


        <h1>Hey i am testing</h1>
        {/* <Loader /> */}


        <CountDown initialMinutes={1} initialSeconds={0}/>


      
        <Loader_2/>
      </div>
    </>
  );
};

export default Testing;
