import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/user";

//일종의 라우팅 미들웨어 역할을 함.

const Redirection = ({ userState }) => {
  console.log("about to redirect");
  switch (userState) {
    case "admin":
      return <Navigate to="/admin" />;
    case "client":
      return <Navigate to="/user" />;
    default:
      return <Navigate to="/" />;
  }
};

//request: admin/client/false
function ValidationRoute({ request }) {
  const { userState } = useContext(UserContext);
  return request.indexOf(userState) !== -1 ? (
    <Outlet />
  ) : (
    <Redirection userState={userState} />
  );
}

export default ValidationRoute;
