import React from "react";
import { getAccessToken } from "utils/authUtils";
import { HeaderClient } from "layouts";
import { Redirect } from "react-router-dom";

const withLayout = (Component) => (props) => {
  return (
    <div className="app" style={{ minHeight: "100vh" }}>
      {!getAccessToken() ? (
        <>
          <HeaderClient />
          <div className="app__body">
            <Component {...props} />
          </div>
        </>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

export default withLayout;
