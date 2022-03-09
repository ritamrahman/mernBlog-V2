import axios from "axios";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_CURRENT_USER_REQUEST,
  LOAD_CURRENT_USER_SUCCESS,
  LOAD_CURRENT_USER_FAIL,
} from "../constants/auth.js";

// user login
export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post("/api/login", { email, password });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.errMessage,
    });
  }
};

// load current user
export const loadCurrentUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_CURRENT_USER_REQUEST });

    const { data } = await axios.get("/api/me");

    dispatch({
      type: LOAD_CURRENT_USER_SUCCESS,
      payload: data.user,
    });
    console.log("data", data.user);
  } catch (error) {
    dispatch({
      type: LOAD_CURRENT_USER_FAIL,
      payload: error.response.data.errMessage,
    });
  }
};
