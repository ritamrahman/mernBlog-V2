import React from "react";
import { Route, Router } from "react-router-dom";
import Search from "../Search";

function hero() {
  return (
    <div className="hero container-fluid w-100 px-3 position-relative">
      <div className="hero_txt_div text-center w-100 d-flex flex-column align-items-center">
        <h4>"Learn Something New"</h4>
        <h1>Blog</h1>
        <Route render={({ history }) => <Search history={history} />} />
      </div>
    </div>
  );
}

export default hero;
