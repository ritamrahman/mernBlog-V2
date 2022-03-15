import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_CURRENT_USER_REQUEST,
  LOAD_CURRENT_USER_SUCCESS,
  LOAD_CURRENT_USER_FAIL,
} from "../constants/auth";

// user login
export const authReducer = (user = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOAD_CURRENT_USER_REQUEST:
      return {
        ...user,
        loading: true,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
    case LOAD_CURRENT_USER_SUCCESS:
      return {
        ...user,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGIN_FAIL:
      return {
        ...user,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOAD_CURRENT_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    default:
      return user;
  }
};
