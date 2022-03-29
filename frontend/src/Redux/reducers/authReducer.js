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
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERROR,
} from "../constants/auth";

// user register/login/logout/loadCurrentUser
export const authReducer = (user = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
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

    case REGISTER_SUCCESS:
      return {
        loading: false,
        newUser: true,
        isAuthenticated: true,
        message: "Registration Successful",
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
    case REGISTER_FAIL:
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
