// import React from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <div>
      <Link to={"/welcome"}>Home</Link>
      <Link to={"/login"}>Login</Link>
      <Link to={"/signup"}>SignUp</Link>
      <Link to={"/score"}>Score</Link>
    </div>
  );
};
