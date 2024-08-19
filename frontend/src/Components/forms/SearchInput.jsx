import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults, setKeyword } from "../../State/search_action";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const keyword = useSelector((state) => state.search.keyword);


  const handelInput = (e) => {
    e.preventDefault();
    dispatch(fetchSearchResults(keyword));        
    navigate('/search')
  };


  return (
    <>
      <div className="col-lg-5 col-md-12 col-12">
        <div
          className="input-group float-center border rounded-pill rounded-pill"
          style={{ border: "none" }}
        >
          <form onSubmit={handelInput} className="form-outline  ">
            <input
              type="search"
              id="floatingInput"
              className="form-control me-2 "
              aria-label="Search"
              value={keyword}
              onChange={(e) => dispatch(setKeyword(e.target.value))}
              placeholder="Search for products..."
            />
          </form>
          <button
            type="submit"
            className="btn btn-primary shadow-0 rounded-pill"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchInput;
