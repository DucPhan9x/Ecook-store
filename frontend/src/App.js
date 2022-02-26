import { withAuthAdmin, withAuthClient, withNoAuthAdmin } from "HOCS";
import { LoginClient, LoginAdmin } from "pages/login";
import { CreationAccountAdmin, Register } from "pages/register";
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
  ROUTE_CLIENT_COURSES_LIST,
  ROUTE_CLIENT_FOODS_LIST,
  ROUTE_CLIENT_INSTRUCTORS_LIST,
  ROUTE_CLIENT_RECIPES_LIST,
  ROUTE_FORGOTPASSWORD,
  ROUTE_FORGOT_PASSWORD_ADMIN,
  ROUTE_LOGIN,
  ROUTE_LOGIN_ADMIN,
  ROUTE_REGISTER,
  ROUTE_RESETPASSWORD,
  ROUTE_RESET_PASSWORD_ADMIN,
  ROUTE_CLIENT_FAVORITES,
  ROUTE_CLIENT_MY_PROFILE,
  ROUTE_CLIENT_MY_ORDERS,
  ROUTE_CLIENT_MY_COURSES,
  ROUTE_CREATE_ADMIN_ACCOUNT,
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
import RecipeDetail from "pages/user/recipe/RecipeDetail";
import withNoAuth from "HOCS/withNoAuth";
import RecipesList from "pages/user/recipe/RecipesList";
import FoodDetail from "pages/user/food/FoodDetail";
import CourseDetail from "pages/user/course/CourseDetail";
import FoodsList from "pages/user/food/FoodsList";
import CoursesList from "pages/user/course/CoursesList";
import InstructorsList from "pages/user/instructor/InstructorsList";
import InstructorDetail from "pages/user/instructor/InstructorDetail";
import Favorites from "pages/user/favvorite/Favorites";
import MyProfile from "pages/user/profile/MyProfile";
import MyOrders from "pages/user/order/MyOrders";
import MyCourses from "pages/user/course/MyCourses";
import Examination from "pages/user/course/Examination";
import MyCourseDetail from "pages/user/course/MyCourseDetail";
import ErrorPage from "pages/Error";

function App() {
  return (
    <Router>
      <Switch>
        {/* client */}
        <Route path="/" component={withNoAuth(HomePageClient, true)} exact />
        <Route
          path={ROUTE_LOGIN}
          component={withNoAuth(LoginClient, true)}
          exact
        />
        <Route
          path={ROUTE_REGISTER}
          component={withNoAuth(Register, true)}
          exact
        />
        <Route
          path={ROUTE_FORGOTPASSWORD}
          component={withNoAuth(ForgotPassword, true)}
          exact
        />
        <Route
          path={ROUTE_RESETPASSWORD}
          component={withNoAuth(ResetPassword, true)}
          exact
        />

        {/* admin */}
        <Route
          path={ROUTE_CREATE_ADMIN_ACCOUNT}
          component={withNoAuthAdmin(CreationAccountAdmin)}
          exact
        />
        <Route
          path={ROUTE_LOGIN_ADMIN}
          component={withNoAuthAdmin(LoginAdmin)}
          exact
        />
        <Route
          path={ROUTE_FORGOT_PASSWORD_ADMIN}
          component={withNoAuthAdmin(ForgotPasswordAdmin)}
          exact
        />
        <Route
          path={ROUTE_RESET_PASSWORD_ADMIN}
          component={withNoAuthAdmin(ResetPasswordAdmin)}
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
        {/* users */}
        <Route path="/recipe" component={withAuthClient(RecipeDetail)} exact />
        <Route
          path={ROUTE_CLIENT_RECIPES_LIST}
          component={withNoAuth(RecipesList)}
          exact
        />
        <Route
          path={ROUTE_CLIENT_COURSES_LIST}
          component={withNoAuth(CoursesList)}
          exact
        />
        <Route
          path={ROUTE_CLIENT_FOODS_LIST}
          component={withNoAuth(FoodsList)}
          exact
        />
        <Route
          path={ROUTE_CLIENT_INSTRUCTORS_LIST}
          component={withNoAuth(InstructorsList)}
          exact
        />
        <Route path="/food" component={withNoAuth(FoodDetail)} exact />
        <Route path="/course" component={withNoAuth(CourseDetail)} exact />
        <Route
          path="/instructor"
          component={withNoAuth(InstructorDetail)}
          exact
        />
        <Route
          path={ROUTE_CLIENT_FAVORITES}
          component={withAuthClient(Favorites)}
          exact
        />

        <Route
          path={ROUTE_CLIENT_MY_PROFILE}
          component={withAuthClient(MyProfile)}
          exact
        />
        <Route
          path={ROUTE_CLIENT_MY_ORDERS}
          component={withAuthClient(MyOrders)}
          exact
        />
        <Route
          path={ROUTE_CLIENT_MY_COURSES}
          component={withAuthClient(MyCourses)}
          exact
        />
        <Route
          path="/examination"
          component={withAuthClient(Examination)}
          exact
        />
        <Route
          path="/my-course"
          component={withAuthClient(MyCourseDetail)}
          exact
        />
        <Route component={withAuthClient(ErrorPage)} />
      </Switch>
    </Router>
  );
}

export default App;
