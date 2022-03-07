import axios from "axios";
import {
  ALL_POSTS_REQUEST,
  ALL_POSTS_SUCCESS,
  ALL_POSTS_FAIL,
  ALL_Trending_POSTS_REQUEST,
  ALL_Trending_POSTS_SUCCESS,
  ALL_Trending_POSTS_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  LIKE_REQUEST,
  LIKE_SUCCESS,
  LIKE_FAIL,
  UNLIKE_REQUEST,
  UNLIKE_SUCCESS,
  UNLIKE_FAIL,
} from "../constants/postConstant";

// Get all  recent posts
export const getAllPosts =
  (page = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_POSTS_REQUEST });

      let link = `/api/posts?page=${page}`;

      const { data } = await axios.get(link);

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

// Get single post
export const getSinglePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: POST_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/post/${id}`);

    dispatch({ type: POST_DETAILS_SUCCESS, payload: data.post });
  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Like/Unlike posts
export const likeUnlikePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: LIKE_REQUEST });

    const host = window.location.host;

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/post/${id}/like`, config);

    dispatch({ type: LIKE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIKE_FAIL,
      payload: error.response.data.message,
    });
  }
};
