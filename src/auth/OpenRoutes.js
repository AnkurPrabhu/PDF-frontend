import React, { useState, useEffect } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { checkLogin } from "../components/helper/apicalls";

const OpenRoute = ({ component: Component, ...rest }) => {
  const [loggedin, setLoggedin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const check = () => {
    checkLogin().then((data) => {
      setLoggedin(data.isLoggedIn);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    check();
  }, []);
  console.log(loggedin);

  if (isLoading) {
    return (
      <div>
        <div className="main__bg "> </div>
        Loading...
      </div>
    ); // Show a loading indicator until the login status is checked
  }
  if (loggedin) {
    return <Navigate to="/dashboard" />;
  } else {
    return <Outlet />;
  }
};

export default OpenRoute;
