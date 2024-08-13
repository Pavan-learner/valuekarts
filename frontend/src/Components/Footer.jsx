import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <footer className="text-center text-lg-start bg-light text-muted">

    <section className="p-4 bg-primary">
      <div className="container">
        <div className="row d-flex">

          <div className="col-md-6 col-sm-12 mb-2 mb-md-0 d-flex justify-content-center justify-content-md-start">
            <div className="">
              <div className="input-group" style={{maxWidth: "400px"}}>
                <input type="email" className="form-control border" placeholder="Email" aria-label="Email"
                  aria-describedby="button-addon2" />
                <button className="btn btn-light border m-0" type="button" id="button-addon2" data-mdb-ripple-color="dark">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-sm-12 float-center">
            <div className="float-md-end">
              <Link to = {'/dev'} className="btn btn-icon btn-light text-secondary px-3 borde m-2" title="Facebook" target="_blank" href="#"><i
                  className="fab fa-facebook-f fa-lg"></i></Link>
              <Link to = {'https://www.instagram.com/monoking.in?igsh=MW4zM2t4NWJiOWcyNw=='} className="btn btn-icon  text-secondary px-3 border m-2" title="Instagram" target="_blank" style={{
                color:"red"
              }}><i
                  className="fab fa-instagram fa-lg"></i></Link>
              <Link to = {'/dev'} className="btn btn-icon btn-light text-secondary px-3 border m-2" title="Youtube" target="_blank" href="#"><i
                  className="fab fa-youtube fa-lg"></i></Link>
              <Link to = {'/dev'} className="btn btn-icon btn-light text-secondary px-3 border m-2" title="Twitter" target="_blank" href="#"><i
                  className="fab fa-twitter fa-lg"></i></Link>
            </div>
          </div>

        </div>
      </div>
    </section>



      <div className="container text-center text-md-start mt-5 mb-4">

        <div className="row mt-3">
         <div className="col-12 col-lg-3 col-sm-12">
  
            <img src="src/assets/logo.png" alt=""  className = "logoimg"/>
            <br />  
            <p>
                <strong> © 2024 Copyright: SpotMarket.com</strong>
                <img src="https://monokingproducts.s3.ap-southeast-2.amazonaws.com/logo_03.png" alt=""  style={{
                  width: "10vw",
                  alignContent: "center",
                }}/>
            </p>
          </div>

          <div className="col-6 col-sm-4 col-lg-2">

            <h6 className="text-uppercase text-dark fw-bold mb-2">
              Store
            </h6>
            <ul className="list-unstyled mb-4">
              <li><Link to = {'/dev'} className="text-muted" href="#">About us</Link></li>
              <li><Link to = {'/dev'} className="text-muted" href="#">Find store</Link></li>
              <li><Link to = {'/dev'} className="text-muted" href="#">Categories</Link></li>
              <li><Link to = {'/dev'} className="text-muted" href="#">Blogs</Link></li>
            </ul>
          </div>


          <div className="col-6 col-sm-4 col-lg-2">

            <h6 className="text-uppercase text-dark fw-bold mb-2">
              Information
            </h6>
            <ul className="list-unstyled mb-4">
              <li><Link to = {'/dev'} className="text-muted" href="#">Help center</Link></li>
              <li><Link to = {'/dev'} className="text-muted" href="#">Money refund</Link></li>
              <li><Link to = {'/dev'} className="text-muted" href="#">Shipping info</Link></li>
              <li><Link to = {'/dev'} className="text-muted" href="#">Refunds</Link></li>
            </ul>
          </div>

          <div className="col-6 col-sm-4 col-lg-2">
            <h6 className="text-uppercase text-dark fw-bold mb-2">
              Support
            </h6>
            <ul className="list-unstyled mb-4">
              <li><Link to = {'/dev'} className="text-muted" href="#">Help center</Link></li>
              <li><Link to = {'/dev'} className="text-muted" href="#">Documents</Link></li>
              <li><Link to = {'/dev'} className="text-muted" href="#">Account restore</Link></li>
              <li><Link to = {'/dev'} className="text-muted" href="#">My orders</Link></li>
            </ul>
          </div>

        </div>

      </div>

    <div className="container">
      <div className="py-4 border-top">
        <div className="d-flex justify-content-between">
         
                    <div className="text-dark">
            <i className="fab fa-lg fa-cc-visa fs-1 m-2"></i>
            <i className="fab fa-lg fa-cc-amex fs-1 m-2"></i>
            <i className="fab fa-lg fa-cc-mastercard fs-1 m-2"></i>
            <i className="fab fa-lg fa-cc-paypal fs-1 m-2"></i>
          </div>

        </div>
      </div>
    </div>
  </footer>
    </>
  )
}

export default Footer