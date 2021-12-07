import { withAuthAdmin, withAuthClient } from "HOCS";
import { LoginClient, LoginAdmin } from "pages/login";
import { Register } from "pages/register";
import { ForgotPassword, ForgotPasswordAdmin } from "pages/forgotPassword";
import { HomePageClient } from "pages/user";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ROUTE_ADMIN_DASHBOARD,
  ROUTE_ADMIN_DASHBOARD_CERTIFICATIONS,
  ROUTE_ADMIN_DASHBOARD_COURSES,
  ROUTE_ADMIN_DASHBOARD_COURSES_ADD,
  ROUTE_ADMIN_DASHBOARD_COURSES_EDIT,
  ROUTE_ADMIN_DASHBOARD_CUSTOMERS,
  ROUTE_ADMIN_DASHBOARD_EMPLOYEES,
  ROUTE_ADMIN_DASHBOARD_EXAMINATION_COURSE,
  ROUTE_ADMIN_DASHBOARD_INSTRUCTORS,
  ROUTE_ADMIN_DASHBOARD_ORDERS,
  ROUTE_ADMIN_DASHBOARD_RECIPES,
  ROUTE_ADMIN_DASHBOARD_RECIPES_ADD,
  ROUTE_ADMIN_DASHBOARD_RECIPES_EDIT,
  ROUTE_ADMIN_DASHBOARD_STATISTICS,
  ROUTE_ADMIN_DASHBOARD_VOUCHERS,
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
  ManageRecipes,
  Statistics,
} from "pages/admin";
import {
  AddCourse,
  EditCourse,
  ExaminationsCourse,
} from "components/admin/manageCourse";
import { AddRecipe, EditRecipe } from "components/admin/manageRecipe";
import ManageCertifications from "pages/admin/manageCertifications";
import ManageOrders from "pages/admin/manageOrders";
import ManageVouchers from "pages/admin/manageVouchers";

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
          path={ROUTE_ADMIN_DASHBOARD_RECIPES}
          component={withAuthAdmin(ManageRecipes)}
          exact
        />
        <Route
          path={ROUTE_ADMIN_DASHBOARD_RECIPES_ADD}
          component={withAuthAdmin(AddRecipe)}
          exact
        />
        <Route
          path={ROUTE_ADMIN_DASHBOARD_RECIPES_EDIT}
          component={withAuthAdmin(EditRecipe)}
          exact
        />
        <Route
          path={ROUTE_ADMIN_DASHBOARD_COURSES}
          component={withAuthAdmin(ManageCourse)}
          exact
        />
        <Route
          path={ROUTE_ADMIN_DASHBOARD_COURSES_ADD}
          component={withAuthAdmin(AddCourse)}
          exact
        />
        <Route
          path={ROUTE_ADMIN_DASHBOARD_COURSES_EDIT}
          component={withAuthAdmin(EditCourse)}
          exact
        />
        <Route
          path={ROUTE_ADMIN_DASHBOARD_EXAMINATION_COURSE}
          component={withAuthAdmin(ExaminationsCourse)}
          exact
        />
        <Route
          path={ROUTE_ADMIN_DASHBOARD_CUSTOMERS}
          component={withAuthAdmin(ManageCustomer)}
          exact
        />
        <Route
          path={ROUTE_ADMIN_DASHBOARD_CERTIFICATIONS}
          component={withAuthAdmin(ManageCertifications)}
          exact
        />
        <Route
          path={ROUTE_ADMIN_DASHBOARD_ORDERS}
          component={withAuthAdmin(ManageOrders)}
          exact
        />
        <Route
          path={ROUTE_ADMIN_DASHBOARD_VOUCHERS}
          component={withAuthAdmin(ManageVouchers)}
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
