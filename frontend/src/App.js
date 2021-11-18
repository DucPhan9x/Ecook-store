import { withAuthAdmin, withAuthClient } from "HOCS";
import { LoginClient, LoginAdmin } from "pages/login";
import { Register } from "pages/register";
import { ForgotPassword, ForgotPasswordAdmin } from "pages/forgotPassword";
import { HomePageClient } from "pages/user";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ROUTE_ADMIN_DASHBOARD,
  ROUTE_ADMIN_DASHBOARD_COURSES,
  ROUTE_ADMIN_DASHBOARD_CUSTOMERS,
  ROUTE_ADMIN_DASHBOARD_EMPLOYEES,
  ROUTE_ADMIN_DASHBOARD_INSTRUCTORS,
  ROUTE_ADMIN_DASHBOARD_STATISTICS,
  ROUTE_FORGOTPASSWORD,
  ROUTE_FORGOT_PASSWORD_ADMIN,
  ROUTE_LOGIN,
  ROUTE_LOGIN_ADMIN,
  ROUTE_REGISTER,
  ROUTE_RESETPASSWORD,
  ROUTE_RESET_PASSWORD_ADMIN,
} from "utils/routes";
import { ResetPassword, ResetPasswordAdmin } from "pages/resetPassword";
import {
  ManageCourse,
  ManageCustomer,
  ManageEmployee,
  ManageFood,
  ManageInstructor,
  Statistics,
} from "pages/admin";

function App() {
  return (
    <Router>
      <Switch>
        {/* client */}
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
        {/* admin */}
        <Route path={ROUTE_LOGIN_ADMIN} component={LoginAdmin} exact />
        <Route
          path={ROUTE_FORGOT_PASSWORD_ADMIN}
          component={ForgotPasswordAdmin}
          exact
        />
        <Route
          path={ROUTE_RESET_PASSWORD_ADMIN}
          component={ResetPasswordAdmin}
          exact
        />
        <Route
          path={ROUTE_ADMIN_DASHBOARD}
          component={withAuthAdmin(ManageFood)}
          exact
        />
        <Route
          path={ROUTE_ADMIN_DASHBOARD_EMPLOYEES}
          component={withAuthAdmin(ManageEmployee)}
          exact
        />
        <Route
          path={ROUTE_ADMIN_DASHBOARD_INSTRUCTORS}
          component={withAuthAdmin(ManageInstructor)}
          exact
        />

        <Route
          path={ROUTE_ADMIN_DASHBOARD_COURSES}
          component={withAuthAdmin(ManageCourse)}
          exact
        />
        <Route
          path={ROUTE_ADMIN_DASHBOARD_CUSTOMERS}
          component={withAuthAdmin(ManageCustomer)}
          exact
        />
        <Route
          path={ROUTE_ADMIN_DASHBOARD_STATISTICS}
          component={withAuthAdmin(Statistics)}
          exact
        />
      </Switch>
    </Router>
  );
}

export default App;
