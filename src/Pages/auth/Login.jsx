import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import sendOtp from "./authControllers/sendOtp";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../State/auth_action";
import Loader from "../../Components/Loading/Loader";
import Backbutton from "../../Components/Backbutton";
import CountDown from "../../Components/timer/CountDown";
import verifyOtp from "./authControllers/verifyOtp";
import { url } from "../../Components/backend_link/data";


const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [loading, setloading] = useState(false);

  const [input, setinput] = useState("");
  const [Number, setNumber] = useState(false);
  const [checkMail, setCheckMail] = useState(false);


  const navigate = useNavigate();

  // ! This is state are for manging of the otp.
  const [otp, setOtp] = useState(null);
  const [sentOtp, setSendOtp] = useState(false);
  const [verifyotp, setVerifyotp] = useState(false);
  const [orderId, setOrderId] = useState(null);


  // * this method used for sending otp to the user
  const handelOTP = async () => {
    const data = await sendOtp(phone);

    // return JSON.stringify(data)
    if (data.orderID) {
      return data.orderId;
    }
    return data.message;
  };


  // * this function is for handling the form login container input
  const handelsubmit = async (e) => {
    setloading(true);
    e.preventDefault();
// Placeholder password for phone login


    const data = mail ? { email: mail, password } : { phone, password };

    try {
      const res = await axios.post(`${url}/api/v2/auth/login`, data);

      dispatch(
        setAuth({
          user: res.data.user,
          token: res.data.token,
        })
      );

      // * Saving the user data in local storage if the application refreshed then the user will be logged in automatically
      localStorage.setItem("auth-Data", JSON.stringify(res.data));

      // console.log(user, token);
      // await handelOTP();
      if (res.data.success) {
        setTimeout(() => {
          if(res.data.user.role  === 1){
            navigate("/dashboard/admin");
          }else{
            navigate("/");
          }
          toast.success(res.data.message);
          setloading(false);
        }, 1000);
      } else {
        toast.error(res.data.message);
        setloading(false);
      }
    } catch (error) {
      toast.error("Somewhing went wrong please try again later");
      setloading(false);
    }
  };

  const handelVerify = async (e) => {
    e.preventDefault();
    // setloading(true);
    try{
    const res = await verifyOtp(phone, otp, orderId);
    
    // Assuming the response data is the `isOTPVerified` object
    console.log(res); // To see the full response object
    if (res.isOTPVerified) {
      setTimeout(() => {
        setVerifyotp(true);
        // setloading(false); // Uncomment if you are using a loading state
      }, 1000);
    } else {
      toast.error('OTP Verification Failed'); 
    }
   } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Backbutton path="/"/>

          <div className="container-fluid form-container mb-10 mt-10 p-4">

            <div className="container login-container">
              <div className="row">
                <div className="col-lg-5 col-md-6 content-part">
                  <h2 className="text-primary">
                    Welcome Back – Ready to Shop?
                  </h2>
                  <img
                    src="https://monokingproducts.s3.ap-southeast-2.amazonaws.com/login.webp"
                    alt="Login"
                    className="signup-img img-fluid"
                  />
                </div>
                <div className="col-lg-7 col-md-6 form-part login-form">
                  <div className="row">
                    <p className="signinlink">
                      Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>

                    <div className="col-lg-8 col-md-10 col-12 login formcol mx-auto">
                      <h3 className="text-primary">Sign In</h3>

                      <form onSubmit={handelsubmit}>
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            value={input}
                            onChange={(e) => {
                              setinput(e.target.value)
                              if(e.target.value.includes("@")){
                                setMail(e.target.value)
                                setCheckMail(true);
                                setPhone('');
                              }
                              if(e.target.value.includes("+91") || e.target.value.includes("91")){
                                setPhone(e.target.value)
                                setNumber(true)
                                setMail('');
                              }
                              if(e.target.value == ""){
                                setCheckMail(false);
                                setNumber(false);
                              }
                            }
                          }
                            className="form-control"
                            id="floatingInput"
                            placeholder="Enter Email Address"
                          />
                          <label htmlFor="floatingInput">Phone or Email</label>
                        </div>

                         {/* If the user is entering the phone number */}
                        {Number && (
                          <>
                            <button
                              className="btn btn-primary w-100 mb-3"
                              onClick={async (e) => {
                                e.preventDefault();
                                setSendOtp(true);
                                try {
                                  const res = await sendOtp(phone);
                                  // console.log(res);
                                  setOrderId(res);
                                } catch (error) {
                                  console.log(error);
                                }
                              }}
                            >
                              Send OTP
                            </button>

                            {sentOtp && (
                              <>
                                <div className="form-floating mb-3">
                                  <input
                                    type="Number"
                                    className="form-control"
                                    id="floatingInput"
                                    value={otp}
                                    onChange={(e) => {
                                      setOtp(e.target.value);
                                      setpassword("123456");
                                    }}
                                    placeholder="Enter OTP"
                                  />
                                  <label htmlFor="floatingInput">
                                    Enter OTP
                                  </label>
                                  <p className="m-0 fs-6 text-success">OTP sent successfully +{phone}</p>
                                  <div className="d-flex align-items-center justify-content-between">
                                    <p className="m-0 text-primary cursor-pointer">Resend OTP</p>
                                    <p>
                                      {" "}
                                      <CountDown
                                        initialMinutes={1}
                                        initialSeconds={0}
                                        
                                      />
                                    </p>
                                  </div>
                                  <button className={`btn btn-${verifyotp ? "success" : "danger"}`} onClick={handelVerify}>
                                    {verifyotp ? "Verified" : "Verify OTP"}
                                  </button>
                                </div>
                              </>
                            )}
                          </>
                        )}

                        {
                          checkMail && (
                            <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            placeholder="Password"
                          />
                          <label htmlFor="floatingPassword">Password</label>
                        </div>
                          )
                        }
                        <div className="form-floating">

                          {
                            Number && sentOtp && verifyotp && (
                              <button
                              className="btn btn-primary mt-3 w-100"
                              type="submit"
                            >
                              Login
                            </button>
                            )
                          }

                          {
                            checkMail && (
                              <button
                              className="btn btn-primary mt-3 w-100"
                              type="submit"
                            >
                              Login
                            </button>
                            )
                          }
                         
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
