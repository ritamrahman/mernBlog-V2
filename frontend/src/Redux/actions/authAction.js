import axios from "axios";

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from "../constants/auth.js";

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
