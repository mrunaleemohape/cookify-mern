import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../pages/Loader";

const AuthWrapper = (props) => {
  const user= useSelector((state) => state?.users?.data);
//   console.log(user);
   const hydrated = useSelector((state) => state?.users?.hydrated);

  if (!hydrated) return <Loader />;
  return user ? props.children : <Navigate to={"/login"} />;
  // <div>AuthWrapper</div>
};

export default AuthWrapper;
