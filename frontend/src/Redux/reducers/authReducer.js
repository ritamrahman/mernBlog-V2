import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_CURRENT_USER_REQUEST,
  LOAD_CURRENT_USER_SUCCESS,
  LOAD_CURRENT_USER_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERROR,
} from "../constants/auth";

// user login/logout/load Current User
export const authReducer = (user = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOAD_CURRENT_USER_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...user,
        loading: true,
        isAuthenticated: false,
        message: "",
      };

    case LOGIN_SUCCESS:
    case LOAD_CURRENT_USER_SUCCESS:
      return {
        ...user,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        message: "Login Successful",
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        message: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...user,
        error: [],
      };

    case LOGIN_FAIL:
    case LOGOUT_FAIL:
      return {
        ...user,
        loading: false,
        isAuthenticated: false,
        user: [],
        error: action.payload,
      };

    case LOAD_CURRENT_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        message: "",
      };
    default:
      return user;
  }
};
