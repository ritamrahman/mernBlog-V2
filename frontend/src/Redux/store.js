import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { getSinglePostReducer, postReducer, trendingPostsReducer } from "./reducers/postReducer";
import { authReducer } from "./reducers/authReducer";

const reducer = combineReducers({
  allPosts: postReducer,
  allTrendingPosts: trendingPostsReducer,
  singlePost: getSinglePostReducer,
  auth: authReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
