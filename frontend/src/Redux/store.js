import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createNewPostReducer, getSinglePostReducer, postReducer, trendingPostsReducer } from "./reducers/postReducer";
import { authReducer } from "./reducers/authReducer";
import { getCategories } from "./reducers/categoryReducer";

const reducer = combineReducers({
  allPosts: postReducer,
  createNewPost: createNewPostReducer,
  allCategories: getCategories,
  allTrendingPosts: trendingPostsReducer,
  singlePost: getSinglePostReducer,
  auth: authReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
