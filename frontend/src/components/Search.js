import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ALL_POSTS_CLEAR } from "../Redux/constants/postConstant";

const Search = ({ history }) => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  // searchHandler function
  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      dispatch({ type: ALL_POSTS_CLEAR }); //clear recent posts array []
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <form class="d-flex" onSubmit={searchHandler}>
      <input
        class="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button class="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
