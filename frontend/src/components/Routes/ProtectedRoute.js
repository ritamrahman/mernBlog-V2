import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
  console.log("Component", Component);
  console.log("rest", rest);
  return (
    <>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            console.log("props", props);
            //isAuthenticated
            if (isAuthenticated === false) {
              return <Redirect to="/" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </>
  );
};

export default ProtectedRoute;
