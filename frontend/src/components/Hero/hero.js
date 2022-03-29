import React from "react";

function hero() {
  return (
    <div className="hero container-fluid w-100 px-3 position-relative">
      <div className="hero_txt_div text-center w-100 d-flex flex-column align-items-center">
        <h4>"Learn Something New"</h4>
        <h1>Blog</h1>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default hero;
