import React from "react";
import { getAuth } from "utils/helpers";
import { Header, Footer } from "layouts/user";

const withAuth =
  (Component, showLogo = true) =>
  (props) => {
    return (
      <div className="app">
        {!(getAuth() && getAuth().token) && (
          <>
            <Header showLogo={showLogo} />
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
