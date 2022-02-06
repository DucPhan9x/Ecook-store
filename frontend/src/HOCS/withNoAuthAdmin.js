import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const withNoAuthAdmin = (Component) => (props) => {
  const isHomepage = window.location.pathname === "/admin/dashboard";
  const { tokenAdmin } = useSelector((store) => store.common);
  return (
    <div className="app-admin">
      {!tokenAdmin || isHomepage ? (
        <Component {...props} />
      ) : (
        <Redirect to="/admin/dashboard" />
      )}
    </div>
  );
};

export default withNoAuthAdmin;
