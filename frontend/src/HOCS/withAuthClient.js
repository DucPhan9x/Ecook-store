import React from "react";
import { getAccessToken } from "utils/authUtils";
import { HeaderClient, Footer } from "layouts";

const withAuth =
  (Component, showLogo = true) =>
  (props) => {
    return (
      <div className="app">
        {!(getAccessToken() && getAccessToken().token) && (
          <>
            <HeaderClient showLogo={showLogo} />
            <div className="app__body">
              <div className="app__content">
                <div className="app__content__inner">
                  <Component {...props} />
                </div>
              </div>
            </div>
            <Footer />
          </>
        )}
      </div>
    );
  };

export default withAuth;
