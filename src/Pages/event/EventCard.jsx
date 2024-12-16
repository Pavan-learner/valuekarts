import React, { useLayoutEffect } from 'react'



const EventCard = ({products}) => {




  // console.log(events);

  return (
    <div>
        <div className="container mb-5">
            <div className="row justify-content-center">
              {products.map((product) => (
                <div className="col-md-4" key={product.id}>
                  <div className="card">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                    </div>

               
                  </div>
                </div>
              ))}
            </div>
          </div>
    </div>
  )
}

export default EventCard