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

// Get all Recent post
export const postReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case ALL_POSTS_REQUEST:
      return {
        loading: true,
        posts: [],
      };

    case ALL_POSTS_SUCCESS:
      return {
        loading: false,
        posts: action.payload.posts,
      };

    case ALL_POSTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// Get all trending posts
export const trendingPostsReducer = (state = { trendingPosts: [] }, action) => {
  switch (action.type) {
    case ALL_Trending_POSTS_REQUEST:
      return {
        loading: true,
        trendingPosts: [],
      };

    case ALL_Trending_POSTS_SUCCESS:
      return {
        loading: false,
        trendingPosts: action.payload,
      };

    case ALL_Trending_POSTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// Get single post
export const getSinglePostReducer = (state = { postDetails: {} }, action) => {
  switch (action.type) {
    case POST_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        postDetails: {},
      };

    case POST_DETAILS_SUCCESS:
      return {
        loading: false,
        postDetails: action.payload,
      };

    case POST_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// Like/Unlike post
export const likeUnlikePostReducer = (state = { like: null }, action) => {
  switch (action.type) {
    case LIKE_REQUEST:
      return {
        ...state,
        loading: true,
        like: null,
      };

    case LIKE_SUCCESS:
      return {
        loading: false,
        like: action.payload,
      };

    case LIKE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
