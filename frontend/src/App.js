import { withAuthClient } from "HOCS";
import { LoginClient } from "pages/login";
import { Register } from "pages/register";
import { ForgotPassword } from "pages/forgotPassword";
import { HomePageClient } from "pages/user";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ROUTE_FORGOTPASSWORD,
  ROUTE_LOGIN,
  ROUTE_REGISTER,
  ROUTE_RESETPASSWORD,
} from "utils/routes";
import ResetPassword from "pages/resetPassword/resetPassword";

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
        <Route
          path={ROUTE_REGISTER}
          component={withAuthClient(Register)}
          exact
        />
        <Route
          path={ROUTE_FORGOTPASSWORD}
          component={withAuthClient(ForgotPassword)}
          exact
        />
        <Route
          path={ROUTE_RESETPASSWORD}
          component={withAuthClient(ResetPassword)}
          exact
        />
      </Switch>
    </Router>
  );
}

export default App;
