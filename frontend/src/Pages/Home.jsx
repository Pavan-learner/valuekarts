import React, { useEffect, useState } from "react";
import Category from "../Components/Category";
import Products from "../Components/Products";
import { Link } from "react-router-dom";
// import { recItems } from "../Components/Data";
import { clearBuy } from "../State/cart_actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { url } from "../Components/backend_link/data";
import Loader_2 from "../Components/Loading/Loader_2";

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);

  const [imgLink, setImgLink] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(clearBuy());

    fetchRecitems();
    fetchinks();
  }, []);

  const [recItems, setRecItems] = useState([]);

  const fetchRecitems = async () => {
    setloading(true);

    try {
      const res = await axios.get(`${url}/api/v2/products/section-two`);

      setRecItems(res.data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  const fetchinks = async () => {
    setloading(true);
    try {
        const res = await axios.get(`${url}/api/v2/section/section-link`)
        setImgLink(res.data.section);
        setloading(false)

    } catch (error) {
      setloading(false)
    }
  }


  if(loading){

    return <Loader_2/>

  }

  return (
    <>
      <section className="pt-3">
        <div className="container">
          <div className="row gx-3 main-content">
            <main className="col-lg-9">
              <div className="card-banner p-5 bg-warning rounded-5" style={{
                backgroundImage: `url(${imgLink[0]?.image[0]})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}>
                <div className="c-1">
                  <h2 className="text-white">
                    Great products with <br />
                    best deals
                  </h2>
                  <p className="text-white">
                    No matter how far along you are in your sophistication as an
                    amateur astronomer, there is always one.
                  </p>
                  <Link
                    to={"/ProductView"}
                    className="btn btn-light shadow-0 text-primary"
                  >
                    {" "}
                    View more{" "}
                  </Link>
                </div>
              </div>
            </main>

            <aside className="col-lg-3">
              <div className="card-banner h-100 rounded-5 c-2">
                <div className="card-body text-center pb-5 service-image service-res" style={
                  {
                    backgroundImage: `url(${imgLink[0]?.image[1]})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }
                }
                >
                  <div>
                    <h5 className="pt-5 text-white">
                      Urban Solutions Simplified
                    </h5>
                    <p className="text-white">
                      Your urban lifestyle, our tailored solutions
                    </p>
                    <Link
                      to={`/urban-services`}
                      href="service.html"
                      className="btn btn-outline-light bg-light text-primary"
                    >
                      {" "}
                      View more{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Category />

      {loading ? <Loader_2 /> : <Products recItems={recItems} />}
    </>
  );
};

export default Home;
