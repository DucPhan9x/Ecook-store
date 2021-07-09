import { withAuth, withAuthClient } from "HOCS/user";
import { Login } from "pages/login";
import { HomePage } from "pages/user";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ROUTE_LOGIN } from "utils/routes";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={withAuth(HomePage)} exact />
        <Route path={ROUTE_LOGIN} component={withAuthClient(Login)} exact />
      </Switch>
    </Router>
  );
}

export default App;
