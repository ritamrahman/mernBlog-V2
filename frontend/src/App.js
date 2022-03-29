import React, { useEffect, useState } from "react";
import Home from "./Home.js";
import Nav from "./components/nav/Nav";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PostDetails from "./components/Post/PostDetails.js";
import { loadCurrentUser } from "./Redux/actions/authAction.js";
import store from "./Redux/store.js";
import SingUp from "./components/Auth/Singup.js";
import { getCategories } from "./Redux/actions/categoryAction.js";

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
        </div>
      </Router>
    </>
  );
}

export default App;
