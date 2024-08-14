import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { url } from "./backend_link/data";
import axios from "axios";

const Category = () => {
  const [Category, setCategory] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/api/v2/category/get-categories`);

      setCategory(res.data.data);
      //   console.log(res.data.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="mt-5">
  <div className="container">
    <header className="mb-4">
      <h3 className="mt-5">Featured Products</h3>
    </header>
    <nav className="row gx-2 gy-2">
      {Category.map((category, index) => (
        <div 
          className="col-6 col-lg-2 mb-3" 
          key={index}
        >
          <Link
            to={category.link}
            className="text-center d-flex flex-column justify-content-center align-items-center"
            style={{ textDecoration: "none" }}
          >
            <div className="category-icon-container mb-1">
              <img
                src={category.image}
                alt={category.name}
                className="img-fluid"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
            <div
              className="text-dark mt-1 card-text"
              style={{ fontSize: "0.8rem" }}
            >
              {category.name}
            </div>
          </Link>
        </div>
      ))}
    </nav>
  </div>
</section>
    </>
  );
};

export default Category;
