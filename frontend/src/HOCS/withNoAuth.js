import React from "react";
import { getAccessToken } from "utils/authUtils";
import { HeaderClient, Footer } from "layouts";
import { Redirect } from "react-router-dom";

const withNoAuth =
  (Component, showFooter = false) =>
  (props) => {
    const isHomepage =
      ["/food", "/course", "/instructor"].includes(window.location.pathname) ||
      window.location.pathname === "/";
    return (
      <div className="app" style={{ minHeight: "100vh" }}>
        {!getAccessToken() || isHomepage ? (
          <>
            <HeaderClient />
            <div className="app__body">
              <Component {...props} />
            </div>
            {showFooter && <Footer />}
          </>
        ) : (
          <Redirect to="/" />
        )}
      </div>
    );
  };

export default withNoAuth;
