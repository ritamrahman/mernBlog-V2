import axios from "axios";
import {
  ALL_POSTS_REQUEST,
  ALL_POSTS_SUCCESS,
  ALL_POSTS_FAIL,
  ALL_Trending_POSTS_REQUEST,
  ALL_Trending_POSTS_SUCCESS,
  ALL_Trending_POSTS_FAIL,
} from "../constants/postConstant";

// Get all posts
export const getAllPosts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_POSTS_REQUEST });

    const { data } = await axios.get("/api/posts");

    dispatch({ type: ALL_POSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_POSTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all trending posts
export const getAllTrendingPosts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_Trending_POSTS_REQUEST });

    const { data } = await axios.get("/api/posts/trending");

    dispatch({ type: ALL_Trending_POSTS_SUCCESS, payload: data.post });
  } catch (error) {
    dispatch({
      type: ALL_Trending_POSTS_FAIL,
      payload: error.response.data.message,
    });
  }
};
