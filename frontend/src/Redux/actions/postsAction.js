import axios from "axios";
import { api } from "../api";
import {
  ALL_POSTS_REQUEST,
  ALL_POSTS_SUCCESS,
  ALL_POSTS_FAIL,
  GET_POSTS_BY_CATEGORY_REQUEST,
  GET_POSTS_BY_CATEGORY_SUCCESS,
  GET_POSTS_BY_CATEGORY_FAIL,
  ALL_Trending_POSTS_REQUEST,
  ALL_Trending_POSTS_SUCCESS,
  ALL_Trending_POSTS_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  LIKE_REQUEST,
  LIKE_SUCCESS,
  LIKE_FAIL,
  RELATED_POSTS_REQUEST,
  RELATED_POSTS_SUCCESS,
  RELATED_POSTS_FAIL,
  CREATE_NEW_POST_REQUEST,
  CREATE_NEW_POST_SUCCESS,
  CREATE_NEW_POST_FAIL,
} from "../constants/postConstant";

// Get all  recent posts
export const getAllPosts =
  (page = 1, category = "", keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_POSTS_REQUEST });

      let link = `/api/posts?page=${page}&keyword=${keyword}`;
      if (category) {
        link = `/api/posts?page=${page}&category=${category}`;
      }
      console.log("link", link);
      const { data } = await axios.get(link);

      console.log("data", data);
      dispatch({
        type: ALL_POSTS_SUCCESS,
        payload: data,
      });
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

    const { data } = await axios.get("/api/trending");

    dispatch({ type: ALL_Trending_POSTS_SUCCESS, payload: data.post });
  } catch (error) {
    dispatch({
      type: ALL_Trending_POSTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get posts by category
export const getPostsByCategory = (categoryName) => async (dispatch) => {
  try {
    dispatch({ type: GET_POSTS_BY_CATEGORY_REQUEST });

    const { data } = await axios.get(`/api/posts/${categoryName}`);

    dispatch({ type: GET_POSTS_BY_CATEGORY_SUCCESS, payload: data.post });
  } catch (error) {
    dispatch({
      type: GET_POSTS_BY_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get single post
export const getSinglePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: POST_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/post/${id}`);

    // console.log("data", data);

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

    const { data } = await axios.put(`/api/post/${id}/like`);
    // console.log("likedata", data);

    dispatch({ type: LIKE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: LIKE_FAIL,
      payload: error.response.data.errMessage,
    });
  }
};

// Get related posts
export const getRelatedPosts = (id) => async (dispatch) => {
  try {
    dispatch({ type: RELATED_POSTS_REQUEST });

    const { data } = await axios.get(`/api/post/${id}/related`);
    console.log("first", data);

    dispatch({ type: RELATED_POSTS_SUCCESS, payload: data.relatedPosts });
  } catch (error) {
    dispatch({
      type: RELATED_POSTS_FAIL,
      payload: error.response.data.errMessage,
    });
  }
};

// Create new post
export const createNewPost = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_NEW_POST_REQUEST });

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(`${api}/post/create`, formData, { withCredentials: true }, config);
    console.log("data", data);
    dispatch({
      type: CREATE_NEW_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_NEW_POST_FAIL,
      payload: error.response.data.errMessage,
    });
  }
};
