import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const withNoAuthAdmin = (Component) => (props) => {
  const isHomepage = window.location.pathname === "/admin/dashboard";
  const { token } = useSelector((store) => store.common);
  return (
    <div className="app-admin">
      {!token || isHomepage ? (
        <Component {...props} />
      ) : (
        <Redirect to="/admin/dashboard" />
      )}
    </div>
  );
};

export default withNoAuthAdmin;
