import React from "react";
import Sidebar from "layouts/Sidebar";
import { HeaderAdmin } from "layouts";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const withAuthAdmin = (Component) => (props) => {
  const classes = useStyles();
  return (
    <div className="app-admin">
      <Sidebar />
      <HeaderAdmin />
      <main className={`${classes.content} app-admin__body`}>
        <div className="app-admin__body__inner">
          <Component {...props} />
        </div>
      </main>
    </div>
  );
};

export default withAuthAdmin;
