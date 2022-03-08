import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_CURRENT_USER_REQUEST,
  LOAD_CURRENT_USER_SUCCESS,
  LOAD_CURRENT_USER_FAIL,
} from "../constants/auth";

// user login
export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOAD_CURRENT_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
    case LOAD_CURRENT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGIN_FAIL:
      return {
        ...state,
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
      return state;
  }
};

// load current user
// export const loadCurrentUserReducer = (state = { logUser: {} }, action) => {
//   switch (action.type) {
//     case LOAD_CURRENT_USER_REQUEST:
//       return {
//         loading: true,
//       };

//     case LOAD_CURRENT_USER_SUCCESS:
//       return {
//         loading: false,
//         user: action.payload,
//       };

//     case LOAD_CURRENT_USER_FAIL:
//       return {
//         loading: false,
//         user: null,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };
