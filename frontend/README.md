 <main className="pt-1">
        <div className="container mt-2">
          <div className="row">
            {/* Product Image Gallery */}

            <div className="col-md-6 mb-4">
              <div className="image-container">
                <img
                  src={selectedImage}
                  className="img-fluid main-image"
                  alt={product.title}
                />
              </div>

              {/* Main Product Image */}
              {/* Thumbnail Images */}
              <div className="d-flex flex-wrap mt-3">
                {(product.imgLink || []).map(
                  (img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="img-thumbnail me-2 mb-2 thumbnail-image"
                        onClick={() => setSelectedImage(img)}
                      />
                    )
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="col-md-6 mb-4">
              <div className="p-4">
                {/* Product Tags */}
                <div className="mb-3">
                  {/* <span className="badge bg-dark me-1">{product.category}</span> */}
                  <span className="badge bg-info me-1">New</span>
                  <span className="badge bg-danger me-1">Bestseller</span>
                </div>

                {/* Product Title */}
                <h6 className="mb-3">{product.name}</h6>
                {/* Price and Discount */}
                <p className="lead">
                  <span className="text-decoration-line-through me-1">
                    {product.price}
                  </span>
                  <span>{product.price}</span>
                </p>

                {/* Product Description */}
                <h5>Details:</h5>
                <p>{product.description}</p>

                <div className="mb-4">
                  <h5>Varieties:</h5>
                  <div className="d-flex flex-wrap">
                    {product?.variety?.length &&
                      product.variety.map((variety, index) => (
                        <span
                          key={index}
                          className="badge bg-secondary me-2 mb-2 variety-badge"
                        >
                          {variety}
                        </span>
                      ))}
                  </div>
                </div>

                {/* Add to Cart / Remove from Cart */}
                <div className="d-flex flex-column w-100">
                  {cart.some((p) => p._id === product._id) ? (
                    <button
                      type="button"
                      className="btn btn-danger mb-2 w-50"
                      onClick={() => {
                        dispatch(removeFromCart(product));
                        // notifyRemovedFromCart(product)
                      }}
                    >
                      Remove from Cart
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-outline-primary mb-2 w-50"
                        onClick={() => {
                          dispatch(addToCart(product));
                          // notifyAddedToCart(product)
                        }}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="btn btn-primary w-50"
                        onClick={() => {
                          // handleBuyNow(product);
                          handelbuyNow(product);
                        }}
                      >
                        Buy Now
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Future Recommendations Section */}
          {/* <hr />
        <div className="recommendations">
          // Future recommendations will go here
        </div> */}
        </div>
      </main>