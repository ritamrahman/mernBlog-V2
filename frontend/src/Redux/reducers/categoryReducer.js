import { GET_CATEGORIES_FAIL, GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS } from "../constants/categoryConstant";

export const getCategories = (categories = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      console.log("first");
      return {
        loading: true,
        categories: [],
      };

    case GET_CATEGORIES_SUCCESS:
      console.log("2nd");
      return {
        loading: false,
        categories: action.payload,
      };

    case GET_CATEGORIES_FAIL:
      return {
        ...categories,
        loading: false,
        error: action.payload,
      };

    default:
      return categories;
  }
};
