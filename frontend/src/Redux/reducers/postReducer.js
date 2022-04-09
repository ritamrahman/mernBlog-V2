import {
  ALL_POSTS_REQUEST,
  ALL_POSTS_SUCCESS,
  ALL_POSTS_FAIL,
  ALL_POSTS_CLEAR,
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
  RESET_REACTION,
  AUTHOR_POPULAR_POSTS_REQUEST,
  AUTHOR_POPULAR_POSTS_SUCCESS,
  AUTHOR_POPULAR_POSTS_FAIL,
  RELATED_POSTS_REQUEST,
  RELATED_POSTS_SUCCESS,
  RELATED_POSTS_FAIL,
  RESET_ERROR,
} from "../constants/postConstant";

const initialState = {
  postDetails: {},
  relatedPosts: [],
  authorPopularPosts: [],
};

// Get all Recent post
export const postReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case ALL_POSTS_REQUEST:
    case GET_POSTS_BY_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_POSTS_SUCCESS:
    case GET_POSTS_BY_CATEGORY_SUCCESS:
      return {
        loading: false,
        totalPosts: action.payload.postsCount,
        posts: [...state.posts, ...action.payload.posts],
      };

    case ALL_POSTS_CLEAR:
      return {
        loading: false,
        posts: [],
      };
    case ALL_POSTS_FAIL:
    case GET_POSTS_BY_CATEGORY_FAIL:
      return {
        ...state,
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
export const getSinglePostReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_DETAILS_REQUEST:
    case RELATED_POSTS_REQUEST:
    case AUTHOR_POPULAR_POSTS_REQUEST:
      return {
        ...state,
        loading: false,
      };

    case LIKE_REQUEST:
      return {
        ...state,
        loading: true,
        reaction: "",
      };

    case POST_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        postDetails: action.payload,
      };

    case RELATED_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        relatedPosts: action.payload,
      };

    case AUTHOR_POPULAR_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        authorPopularPosts: action.payload,
      };

    case LIKE_SUCCESS:
      return {
        ...state,
        loading: false,
        reaction: action.payload,
      };

    case RESET_REACTION:
      return {
        ...state,
        loading: false,
        reaction: "",
      };

    case POST_DETAILS_FAIL:
    case RELATED_POSTS_FAIL:
    case AUTHOR_POPULAR_POSTS_FAIL:
    case LIKE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case RESET_ERROR:
      return {
        ...state,
        loading: false,
        error: "",
      };

    default:
      return state;
  }
};
