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
  RESET_REACTION,
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
export const getSinglePostReducer = (postDetails = {}, action) => {
  switch (action.type) {
    case POST_DETAILS_REQUEST:
      return {
        ...postDetails,
        loading: false,
      };

    case LIKE_REQUEST:
      return {
        ...postDetails,
        loading: true,
        reaction: "",
      };

    case POST_DETAILS_SUCCESS:
      return {
        ...postDetails,
        loading: false,
        postDetails: action.payload,
      };

    case LIKE_SUCCESS:
      return {
        ...postDetails,
        loading: false,
        reaction: action.payload,
      };

    case RESET_REACTION:
      return {
        ...postDetails,
        loading: false,
        reaction: "",
      };

    case POST_DETAILS_FAIL:
    case LIKE_FAIL:
      return {
        ...postDetails,
        loading: false,
        error: action.payload,
      };

    default:
      return postDetails;
  }
};

// Like/Unlike post
// export const likeUnlikePostReducer = (state = { postDetails: {} }, action) => {
//   switch (action.type) {
//     case LIKE_REQUEST:
//       return {
//         ...state,
//       };

//     case LIKE_SUCCESS:
//       return {
//         loading: false,
//         postDetails: action.payload,
//       };

//     case LIKE_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };

//     default:
//       return state;
//   }
// };
