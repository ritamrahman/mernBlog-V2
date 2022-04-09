import axios from "axios";
import { api } from "../api";
import { GET_CATEGORIES_FAIL, GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS } from "../constants/categoryConstant";

// get categories
export const getCategories = () => async (dispatch) => {
  // console.log("ctDT");
  try {
    dispatch({ type: GET_CATEGORIES_REQUEST });

    const { data } = await axios.get(`${api}/categories`);
    dispatch({ type: GET_CATEGORIES_SUCCESS, payload: data.categoryList });
  } catch (error) {
    dispatch({ type: GET_CATEGORIES_FAIL, payload: error.response.data.message });
  }
};
