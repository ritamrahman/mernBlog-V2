import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../Redux/actions/authAction";
import { RESET_ERROR } from "../../Redux/constants/postConstant";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  toast.configure();
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated, message, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogin(email, password));
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <p>{error && error}</p>
        {/* Email input */}
        <div className="form-outline mb-4">
          <input
            type="email"
            id="form3Example3"
            className="form-control form-control-lg"
            placeholder="Enter a valid email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="form-label" htmlFor="form3Example3">
            Email address
          </label>
        </div>
        {/* Password input */}
        <div className="form-outline mb-3">
          <input
            type="password"
            id="form3Example4"
            className="form-control form-control-lg"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="form-label" htmlFor="form3Example4">
            Password
          </label>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          {/* Checkbox */}
          <div className="form-check mb-0">
            <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example3" />
            <label className="form-check-label" htmlFor="form2Example3">
              Remember me
            </label>
          </div>
          <Link to="/forgot" className="text-body">
            Forgot password?
          </Link>
        </div>
        <div className="text-center text-lg-end mt-4 pt-2">
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            data-bs-dismiss="modal"
            aria-label="Close"
            style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
          >
            Login
          </button>
          <p className="small fw-bold text-center mt-2 pt-1 mb-0">
            Don't have an account?
            <Link to="/singup" className="link-danger">
              Register
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default Login;
