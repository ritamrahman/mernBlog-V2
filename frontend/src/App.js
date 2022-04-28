import React, { useEffect } from "react";
import Home from "./Home.js";
import Nav from "./components/nav/Nav";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PostDetails from "./components/Post/PostDetails.js";
import { loadCurrentUser } from "./Redux/actions/authAction.js";
import store from "./Redux/store.js";
import SingUp from "./components/Auth/Singup.js";
import { getCategories } from "./Redux/actions/categoryAction.js";
import FilteredPosts from "./FilteredPosts";
import CreatePost from "./components/Post/CreatePost.js";
import ProtectedRoute from "./components/Routes/ProtectedRoute.js";

// load current user on page refresh

function App() {
  useEffect(() => {
    // on page load dispatch bellow actions
    store.dispatch(loadCurrentUser()); //load currently loggedIn user
    store.dispatch(getCategories()); // get all categories
  }, []);

  return (
    <>
      <Router>
        <div className="App">
          <Nav />
          <Route path="/singup" component={SingUp} exact />
          {/* post */}
          <Route path="/" component={Home} exact />
          <Route path="/post/:id" component={PostDetails} exact />
          <Route path="/posts/:category" component={FilteredPosts} />
          <Route path="/search/:keyword" component={FilteredPosts} />
          <ProtectedRoute path="/createpost" component={CreatePost} />
        </div>
      </Router>
    </>
  );
}

export default App;
