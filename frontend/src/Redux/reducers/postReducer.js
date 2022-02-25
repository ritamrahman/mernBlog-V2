import {
  ALL_POSTS_REQUEST,
  ALL_POSTS_SUCCESS,
  ALL_POSTS_FAIL,
  ALL_Trending_POSTS_REQUEST,
  ALL_Trending_POSTS_SUCCESS,
  ALL_Trending_POSTS_FAIL,
} from "../constants/postConstant";

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
