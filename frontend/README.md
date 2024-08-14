# dotComCode



Futre Code 
    <div className="accordion-item">
                          <h2 className="accordion-header" id="headingTwo">
                            <button
                              className="accordion-button text-dark bg-light"
                              type="button"
                              data-mdb-toggle="collapse"
                              data-mdb-target="#panelsStayOpen-collapseTwo"
                              aria-expanded="true"
                              aria-controls="panelsStayOpen-collapseTwo"
                            >
                              Brands
                            </button>
                          </h2>
                          <div
                            id="panelsStayOpen-collapseTwo"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingTwo"
                          ></div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingThree">
                            <button
                              className="accordion-button text-dark bg-light"
                              type="button"
                              data-mdb-toggle="collapse"
                              data-mdb-target="#panelsStayOpen-collapseThree"
                              aria-expanded="false"
                              aria-controls="panelsStayOpen-collapseThree"
                            >
                              Price
                            </button>
                          </h2>
                          <div
                            id="panelsStayOpen-collapseThree"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingThree"
                          >
                            <div className="accordion-body">
                              <div className="range">
                                <input
                                  type="range"
                                  className="form-range"
                                  id="customRange1"
                                />
                              </div>
                              <div className="row mb-3">
                                <div className="col-6">
                                  <p className="mb-0">Min</p>
                                  <div className="form-outline">
                                    <input
                                      type="number"
                                      id="typeNumber"
                                      className="form-control"
                                    />
                                    <label
                                      className="form-label"
                                      htmlFor="typeNumber"
                                    >
                                      $0
                                    </label>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <p className="mb-0">Max</p>
                                  <div className="form-outline">
                                    <input
                                      type="number"
                                      id="typeNumber"
                                      className="form-control"
                                    />
                                    <label
                                      className="form-label"
                                      htmlFor="typeNumber"
                                    >
                                      $1,0000
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <button
                                type="button"
                                className="btn btn-white w-100 border border-secondary"
                              >
                                apply
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingThree">
                            <button
                              className="accordion-button text-dark bg-light"
                              type="button"
                              data-mdb-toggle="collapse"
                              data-mdb-target="#panelsStayOpen-collapseFour"
                              aria-expanded="false"
                              aria-controls="panelsStayOpen-collapseFour"
                            >
                              Size
                            </button>
                          </h2>
                          <div
                            id="panelsStayOpen-collapseFour"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingThree"
                          >
                            <div className="accordion-body">
                              <input
                                type="checkbox"
                                className="btn-check border justify-content-center"
                                id="btn-check1"
                                checked
                                autocomplete="off"
                              />
                              <label
                                className="btn btn-white mb-1 px-1"
                                style={{ width: "60px;" }}
                                htmlFor="btn-check1"
                              >
                                XS
                              </label>
                              <input
                                type="checkbox"
                                className="btn-check border justify-content-center"
                                id="btn-check2"
                                checked
                                autocomplete="off"
                              />
                              <label
                                className="btn btn-white mb-1 px-1"
                                style={{ width: "60px;" }}
                                htmlFor="btn-check2"
                              >
                                SM
                              </label>
                              <input
                                type="checkbox"
                                className="btn-check border justify-content-center"
                                id="btn-check3"
                                checked
                                autocomplete="off"
                              />
                              <label
                                className="btn btn-white mb-1 px-1"
                                style={{ width: "60px;" }}
                                htmlFor="btn-check3"
                              >
                                LG
                              </label>
                              <input
                                type="checkbox"
                                className="btn-check border justify-content-center"
                                id="btn-check4"
                                checked
                                autocomplete="off"
                              />
                              <label
                                className="btn btn-white mb-1 px-1"
                                style={{ width: "60px;" }}
                                htmlFor="btn-check4"
                              >
                                XXL
                              </label>
                            </div>
                          </div>
                        </div>


                         <div className="accordion-item">
                          <h2 className="accordion-header" id="headingThree">
                            <button
                              className="accordion-button text-dark bg-light"
                              type="button"
                              data-mdb-toggle="collapse"
                              data-mdb-target="#panelsStayOpen-collapseFive"
                              aria-expanded="false"
                              aria-controls="panelsStayOpen-collapseFive"
                            >
                              Ratings
                            </button>
                          </h2>
                          <div
                            id="panelsStayOpen-collapseFive"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingThree"
                          >
                            <div className="accordion-body">
                              {/* <!-- Default checkbox -->  */}
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="flexCheckDefault"
                                  checked
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheckDefault"
                                >
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-warning"></i>
                                </label>
                              </div>
                              {/* <!-- Default checkbox -->  */}
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="flexCheckDefault"
                                  checked
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheckDefault"
                                >
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-secondary"></i>
                                </label>
                              </div>
                              {/* {/* <!-- Default checkbox -->  */}
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="flexCheckDefault"
                                  checked
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheckDefault"
                                >
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-secondary"></i>
                                  <i className="fas fa-star text-secondary"></i>
                                </label>
                              </div>
                              {/* {/* <!-- Default checkbox -->  */}
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="flexCheckDefault"
                                  checked
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexCheckDefault"
                                >
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-warning"></i>
                                  <i className="fas fa-star text-secondary"></i>
                                  <i className="fas fa-star text-secondary"></i>
                                  <i className="fas fa-star text-secondary"></i>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div




                        /// * category section

                        
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