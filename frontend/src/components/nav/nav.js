import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";

import { Link } from "react-router-dom";
import Login from "../Auth/Login";

// toggle btn functon
const myFun = () => {
  const toggleBtn = document.querySelector(".sidebar-toggle");
  const closeBtn = document.querySelector(".close-btn");
  const sidebar = document.querySelector(".sidebar");

  //using toggle
  sidebar.classList.toggle("show-sidebar");

  closeBtn.addEventListener("click", function () {
    sidebar.classList.remove("show-sidebar");
  });
};

function Nav() {
  const { user, loading, isAuthenticated, error } = useSelector((state) => state.auth);

  const [pathName, setPathName] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      // toast.success("successful");
      // document.getElementById("exampleModal").setAttribute("data-bs-dismiss", "modal");
      document.getElementById("exampleModal").removeAttribute("class", "show");
    }
  }, []);

  return (
    <div>
      <div className=" position-relative p-0">
        <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-between">
          {/* left side start */}
          <div className="left_side w-25">
            {/* nav arrow button */}

            <button className="sidebar-toggle slide-right ps-5">
              <ArrowForwardIcon onClick={myFun} />
            </button>
          </div>
          {/* left side end */}

          {/* center start */}
          <div className="center d-flex justify-content-center w-50">
            <h1 className="m-0" style={{ color: "#0568EB" }}>
              <Link to="/">LOGO</Link>
            </h1>
          </div>
          {/* center end */}

          {/* right side start */}
          <div className="right_side w-25">
            {!loading && user ? (
              <>
                {/* btn group start */}
                <div className=" d-flex justify-content-around align-items-center pe-5">
                  {/* create post btn */}
                  <button className="btn btn-outline-primary">
                    <Link className="text-decoration-none">Create post</Link>
                  </button>

                  {/* // Dropdown btn start */}
                  <>
                    <div className="dropdownBTN">
                      <div className="dropdown">
                        <span
                          className=" dropdown-toggle"
                          type=""
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Hello {user.name}
                        </span>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                          <li>
                            {user.role !== "user" && (
                              <Link className="dropdown-item" to="#">
                                Dashboard
                              </Link>
                            )}
                          </li>
                          <li>
                            <Link className="dropdown-item" to="#">
                              profile
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="#">
                              Logout
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </>
                  {/* // Dropdown btn end */}
                </div>
                {/* btn group end */}
              </>
            ) : (
              <>
                {/* btn group start */}
                <div className=" d-flex justify-content-center align-items-center pe-5">
                  <button type="button" id="signUp" className="c_btn">
                    <Link className="text-decoration-none">Sing Up</Link>
                    {/* Sing Up */}
                  </button>

                  <button
                    type="button"
                    id="login"
                    className="c_btn"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <span className="text-decoration-none">Login</span>
                  </button>

                  {/* Modal start */}
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        <div className="modal-body">
                          {/* form start */}
                          <Login />
                          {/* form end */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Modal end*/}
                </div>
                {/* btn group end */}
              </>
            )}
          </div>
          {/* right side end */}
        </nav>
      </div>
      {/* // menu start */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="logo.svg" className="logo" alt="" />
          <button className="close-btn">
            <CloseIcon />
          </button>
        </div>
        {/* <!-- links --> */}
        <ul className="links">
          <li>
            <Link to="#">Home</Link>
          </li>
        </ul>
      </aside>
      {/* // menu end */}
    </div>
  );
}

export default Nav;
