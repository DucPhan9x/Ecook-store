import React from "react";
import { getAccessToken } from "utils/authUtils";
import { HeaderClient, Footer } from "layouts";
import { Redirect } from "react-router-dom";

const withAuth =
  (Component, showFooter = false, isFullHeight = false) =>
  (props) => {
    return (
      <div className="app" style={{ minHeight: isFullHeight ? "100vh" : "" }}>
        {getAccessToken() ? (
          <>
            <HeaderClient />
            <div className="app__body">
              <Component {...props} />
            </div>
            {showFooter && <Footer />}
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </div>
    );
  };

export default withAuth;
