import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../Components/Loading/Loader";
import Backbutton from "../../Components/Backbutton";
import CountDown from "../../Components/timer/CountDown";
import sendOtp from "./authControllers/sendOtp";
import verifyOtp from "./authControllers/verifyOtp";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../State/auth_action";
import { url } from "../../Components/backend_link/data";

const Signup = () => {
  const [mail, setMail] = useState("");
  const [Name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ! when user get resitered in that time only we will store the data in local storage
  const auth = useSelector((state) => state.auth);
  const dispatch =  useDispatch();

  const [input, setinput] = useState("");

  // ! this states used for managing the otp.
  const [otp, setOtp] = useState(null);
  const [sentOtp, setSendOtp] = useState(false);
  const [verifyotp, setVerifyotp] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const [Number, setNumber] = useState(false);
  const [checkMail, setCheckMail] = useState(false);

  const navigate = useNavigate();

  const [loading, setloading] = useState(false);

  const handelsubmit = async (e) => {
    e.preventDefault();
    console.log(mail, Name, phone, password);

    if (Number) {
      // here we have to send otp to the user
    } else {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
    }

    setloading(true);

    try {
      const res = await axios.post(
        `${url}/api/v2/auth/register`,
        {
          name: Name,
          email: mail,
          password,
          phone,
        }
      );
      console.log(res.data);

      dispatch(
        setAuth({
          user: res.data.user,
          token: res.data.token,
        })
      );

      if (res.data.success) {
        setTimeout(() => {
          navigate("/");
          toast.success(res.data.message);
          setloading(false);
        }, 1000);
      } else {
        // alert(res.data.message);
        toast.error(res.data.message);
        setloading(false);
      }
    } catch (error) {
      console.log(error);
      alert(error);
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
          <Backbutton path={"/"} />
          <div className="container-fluid form-container mb-10 mt-10 p-4 form-container">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="container login-container ">
              <div className="row ">
                <div className="col-md-5 content-part">
                  {/* <!-- <h4 class="logo">Smart Account</h4> --> */}
                  <h2 className="text-primary">Create an account</h2>
                  <p>
                    Start Your Shopping Adventure – Register for Exclusive
                    Benefits!
                  </p>

                  <img
                    src="https://monokingproducts.s3.ap-southeast-2.amazonaws.com/signup.webp"
                    className="signup-img"
                    alt=""
                  />
                </div>

                <div className="col-md-7 form-part signup-form">
                  <div className="row">
                    <p className="signinlink">
                      Already have an account?{" "}
                      <Link to={"/login"}>Sign In</Link>
                    </p>

                    <div className="col-lg-8 col-md-11  formcol mx-auto">
                      <h3 className="text-primary">Sign Up Now</h3>

                      <form onSubmit={handelsubmit}>
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            value={Name}
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                            placeholder="Enter Your Name: "
                          />
                          <label htmlFor="floatingInput">Full Name</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            value={input}
                            onChange={(e) => {
                              setinput(e.target.value);
                              if (e.target.value.includes("@")) {
                                setMail(e.target.value);
                                setCheckMail(true);
                                setPhone("");
                              }
                              if (
                                e.target.value.startsWith("+91") ||
                                e.target.value.startsWith("91")
                              ) {
                                setMail(null);
                                setPhone(e.target.value);
                                setNumber(true);
                              }
                              if (e.target.value == "") {
                                setCheckMail(false);
                                setNumber(false);
                              }
                            }}
                            placeholder="Mobile Number or Email"
                          />
                          <label htmlFor="floatingInput">
                            Phone Number or Email
                          </label>
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

                        {/* If the user is entering the email address */}
                        {checkMail && (
                          <>
                            <div className="form-floating mb-3">
                              <input
                                type="password"
                                className="form-control"
                                id="floatingInput"
                                value={password}
                                onChange={(e) => {
                                  setpassword(e.target.value);
                                }}
                                placeholder="Enter Email Address"
                              />
                              <label htmlFor="floatingInput">Password</label>
                            </div>
                            <div className="form-floating">
                              <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Password"
                                value={confirmPassword}
                                onChange={(e) => {
                                  setConfirmPassword(e.target.value);
                                }}
                              />
                              <label htmlFor="floatingPassword">
                                Confirm Password
                              </label>
                            </div>
                          </>
                        )}

                        {Number && sentOtp && verifyotp && (
                          <div className="form-floating mt-4 w-100">
                            <button
                              className="btn btn-primary w-100"
                              type="submit"
                            >
                              Create Account
                            </button>
                          </div>
                        )}

                        {checkMail && (
                          <div className="form-floating mt-4 w-100">
                            <button
                              className="btn btn-primary w-100"
                              type="submit"
                            >
                              Create Account
                            </button>
                          </div>
                        )}
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

export default Signup;
