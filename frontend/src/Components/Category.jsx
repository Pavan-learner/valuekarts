import React from 'react'
import { Link } from 'react-router-dom'
import { GiClothes, GiCycling } from "react-icons/gi";
import { MdDevices } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { MdEvent } from "react-icons/md";

const Category = () => {
  return (
<>
<section>

    <div className="container pt-5">
      <nav className="row gy-4 d-flex">
        <div className="col-lg-6 col-md-12">
          <div className="row">
            <div className="col-3">
              <Link to = {"/interior"} href="#" className="text-center d-flex flex-column justify-content-center">
                <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                  <i className="fas fa-couch fa-xl fa-fw"></i>
                </button>
                <div className="text-dark">Interior items</div>
              </Link>
            </div>
            <div className="col-3">
              <Link to = '/book-ride' href="#" className="text-center d-flex flex-column justify-content-center">
                <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                <FaCar style={{width:"100%",height:"100%", fontSize: "25px"}} />
                </button>
                <div className="text-dark">Book Rides</div>
              </Link>
            </div>

            <div className="col-3">
              <Link to = '/event' href="#" className="text-center d-flex flex-column justify-content-center">
                <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                <MdEvent style={{width:"100%",height:"100%", fontSize: "25px"}} />
                </button>
                <div className="text-dark">Schedule Event</div>
              </Link>
            </div>

            

            <div className="col-3">
              <a href="#" className="text-center d-flex flex-column justify-content-center">
                <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                  <i className="fas fa-clock fa-xl fa-fw"></i>
                </button>
                <div className="text-dark">Tiles</div>
              </a>
            </div>

          </div>
        </div>

        <div className="col-lg-6 col-md-12">

          <div className="row">
            <div className="col-3">
              <a href="service.html" className="text-center d-flex flex-column justify-content-center">
                <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                <FaUsers style={{fontSize:"25px"}}/>
                </button>
                <div className="text-dark">Urban Services</div>
              </a>
            </div>

            <div className="col-3">
              <a href="#" className="text-center d-flex flex-column justify-content-center">
                <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                <GiCycling  style={{ fontSize: "25px" }}/>
                </button>
                <div className="text-dark">Bycycles</div>
              </a>
            </div>

            <div className="col-3">
              <Link to = {'/productView'} className="text-center d-flex flex-column justify-content-center">
                <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                 <GiClothes style = {{fontSize:"25px"}}/>
                </button>
                <Link to = {'/productView'} className="text-dark">Women</Link>
              </Link>
            </div>

            <div className="col-3">
              <Link to = {'/productView'} className="text-center d-flex flex-column justify-content-center">
                <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                  <i className="fas fa-tshirt fa-xl fa-fw"></i>
                </button>
                <div className="text-dark">Men</div>
              </Link>
            </div>

          </div>
        </div>

        <div className="col-lg-6 col-md-12">
          <div className="row">
            <div className="col-3">
              <Link to = {'/productView'} href="#" className="text-center d-flex flex-column justify-content-center">
                <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                  <i className="fas fa-tshirt fa-xl fa-fw"></i>
                </button>
                <div className="text-dark">Childrens</div>
              </Link>
            </div>
            <div className="col-3">
              <Link to = {'/productView'} href="#" className="text-center d-flex flex-column justify-content-center">
                <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                  <i className="fas fa-shoe-prints fa-xl fa-fw"></i>
                </button>
                <div className="text-dark">Footwear</div>
              </Link>
            </div>

            <div className="col-3">
              <Link to = {'/productView'} href="#" className="text-center d-flex flex-column justify-content-center">
                <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                  <i className="fas fa-tools fa-xl fa-fw"></i>
                </button>
                <div className="text-dark">Tools</div>
              </Link>
            </div>
            <div className="col-3">
              <Link to = {'/productView'} className="text-center d-flex flex-column justify-content-center">
                <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                  <MdDevices style={{width:"100%",height:"100%", fontSize: "25px"}}/>
                </button>
                <Link to = {'/productView'} className="text-dark">Eelctronics</Link>
              </Link>
            </div>

          </div>
        </div>

        <div className="col-lg-6 col-md-12">
          <div className="row">

            {/* <!-- If the client ask to add another row of categories --> */}
           

          </div>
        </div>

      </nav>
    </div>
  </section>

</>
  )
}

export default Category