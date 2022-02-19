import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";

const myFun = () => {
  console.log("hello");
  const toggleBtn = document.querySelector(".sidebar-toggle");
  const closeBtn = document.querySelector(".close-btn");
  const sidebar = document.querySelector(".sidebar");

  //using toggle
  sidebar.classList.toggle("show-sidebar");

  closeBtn.addEventListener("click", function () {
    sidebar.classList.remove("show-sidebar");
  });
};
function nav() {
  return (
    <div>
      <div className=" position-relative p-0">
        <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-between">
          {/* left side start */}
          <div className="left_side w-25">
            {/* nav arrow button */}
            <button class="sidebar-toggle slide-right ps-5">
              <ArrowForwardIcon onClick={myFun} />
            </button>
          </div>
          {/* left side end */}

          {/* center start */}
          <div className="center d-flex justify-content-center w-50">
            <h1 className="m-0" style={{ color: "#0568EB" }}>
              LOGO
            </h1>
          </div>
          {/* center end */}

          {/* right side start */}
          <div className="right_side w-25">
            <div className=" d-flex justify-content-center align-items-center pe-5">
              <button type="button" id="signUp" className="c_btn">
                <a className="text-decoration-none" href="#">
                  Sign Up
                </a>
              </button>
              <button type="button" id="login" className="c_btn">
                <a className="text-decoration-none" href="#">
                  Login
                </a>
              </button>
            </div>
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
            <a href="#">Home</a>
          </li>
        </ul>
      </aside>
      {/* // menu end */}
    </div>
  );
}

export default nav;
