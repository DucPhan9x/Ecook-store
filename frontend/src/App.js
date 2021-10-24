import { withAuthClient } from "HOCS";
import { LoginClient } from "pages/login";
import { HomePageClient } from "pages/user";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ROUTE_LOGIN } from "utils/routes";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={withAuthClient(HomePageClient)} exact />
        <Route
          path={ROUTE_LOGIN}
          component={withAuthClient(LoginClient)}
          exact
        />
      </Switch>
    </Router>
  );
}

export default App;
