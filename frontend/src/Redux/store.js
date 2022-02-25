import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { postReducer, trendingPostsReducer } from "./reducers/postReducer";

const reducer = combineReducers({
  allPosts: postReducer,
  allTrendingPosts: trendingPostsReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
