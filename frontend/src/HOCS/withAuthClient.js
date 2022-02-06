import React from "react";
import { HeaderClient, Footer } from "layouts";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const withAuth =
  (Component, showFooter = false, isFullHeight = false) =>
  (props) => {
    const { token } = useSelector((store) => store.common);

    return (
      <div className="app" style={{ minHeight: isFullHeight ? "100vh" : "" }}>
        {token ? (
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
