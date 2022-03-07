import React from "react";
import Home from "./Home.js";
import Nav from "./components/nav/Nav";
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";
import PostDetails from "./components/Post/PostDetails.js";
import Login from "./components/Auth/Login.js";

function App() {
  const path = window.location.pathname;
  return (
    <>
      <Router>
        <div className="App">
          <Nav />
          {/* post */}
          <Route path="/" component={Home} exact />
          <Route path="/post/:id" component={PostDetails} exact />
        </div>
      </Router>
    </>
  );
}

export default App;
