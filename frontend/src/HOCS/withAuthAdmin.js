import React from "react";
import Sidebar from "layouts/Sidebar";
import { HeaderAdmin } from "layouts";
import { makeStyles } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { getAccessToken } from "utils/authUtils";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingBottom: 0,
  },
}));

const withAuthAdmin = (Component) => (props) => {
  const classes = useStyles();
  return (
    <div className="app-admin">
      {getAccessToken() ? (
        <>
          <Sidebar />
          <HeaderAdmin />
          <main className={`${classes.content} app-admin__body`}>
            <div className="app-admin__body__inner">
              <Component {...props} />
            </div>
          </main>
        </>
      ) : (
        <Redirect to="/admin" />
      )}
    </div>
  );
};

export default withAuthAdmin;
