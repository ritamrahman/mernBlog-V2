import React from "react";
import Home from "./Home.js";
import Nav from "./components/nav/nav";
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";
import PostDetails from "./components/Post/PostDetails.js";

function App() {
  return (
    <>
      <Nav />
      <Router>
        <div className="App">
          <Route path="/" component={Home} exact />
          <Route path="/post/:id" component={PostDetails} exact />
        </div>
      </Router>
    </>
  );
}

export default App;
