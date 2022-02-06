// special
export const ROUTE_CREATE_ADMIN_ACCOUNT = "/create-admin-account";
// client
export const ROUTE_LOGIN = "/login";
export const ROUTE_REGISTER = "/register";
export const ROUTE_FORGOTPASSWORD = "/forgot-password";
export const ROUTE_RESETPASSWORD = "/reset-password";
export const PRIVACY_WEBSITE = "/privacy";
// admin
export const ROUTE_LOGIN_ADMIN = "/admin";
export const ROUTE_FORGOT_PASSWORD_ADMIN = "/admin/forgot-password";
export const ROUTE_RESET_PASSWORD_ADMIN = "/admin/reset-password";
export const ROUTE_ADMIN_DASHBOARD = "/admin/dashboard"; // food manage
export const ROUTE_ADMIN_DASHBOARD_EMPLOYEES = "/admin/dashboard/employees"; // employee manage
export const ROUTE_ADMIN_DASHBOARD_INSTRUCTORS = "/admin/dashboard/instructors"; // instructor manage
export const ROUTE_ADMIN_DASHBOARD_COURSES = "/admin/dashboard/courses"; // course manage
export const ROUTE_ADMIN_DASHBOARD_COURSES_EDIT =
  "/admin/dashboard/courses/edit/:courseID"; // course manage
export const ROUTE_ADMIN_DASHBOARD_EXAMINATION_COURSE =
  "/admin/dashboard/courses/:courseID/examinations"; // course manage
export const ROUTE_ADMIN_DASHBOARD_COURSES_ADD = "/admin/dashboard/courses/add"; // course manage
export const ROUTE_ADMIN_DASHBOARD_CUSTOMERS = "/admin/dashboard/customers"; // customer manage
export const ROUTE_ADMIN_DASHBOARD_CUSTOMER_DETAIL =
  "/admin/dashboard/customers/:customerID"; // customer manage
export const ROUTE_ADMIN_DASHBOARD_STATISTICS = "/admin/dashboard/statistics"; // statistics manage
export const ROUTE_ADMIN_DASHBOARD_RECIPES = "/admin/dashboard/recipes"; // recipes manage
export const ROUTE_ADMIN_DASHBOARD_RECIPES_ADD =
  "/admin/dashboard/recipes/create"; // recipes manage
export const ROUTE_ADMIN_DASHBOARD_RECIPES_EDIT =
  "/admin/dashboard/recipes/edit/:recipeID"; // recipes manage
export const ROUTE_ADMIN_DASHBOARD_CERTIFICATIONS =
  "/admin/dashboard/certifications"; // course manage
export const ROUTE_ADMIN_DASHBOARD_ORDERS = "/admin/dashboard/orders"; // course manage
export const ROUTE_ADMIN_DASHBOARD_VOUCHERS = "/admin/dashboard/vouchers"; // course manage
// user
export const ROUTE_CLIENT_RECIPE_DETAIL = "/recipe?id=:recipeId"; // course manage
export const ROUTE_CLIENT_RECIPES_LIST = "/recipes-list"; // course manage
export const ROUTE_CLIENT_FOODS_LIST = "/foods-list"; // course manage
export const ROUTE_CLIENT_COURSES_LIST = "/courses-list"; // course manage
export const ROUTE_CLIENT_INSTRUCTORS_LIST = "/instructors-list"; // course manage
export const ROUTE_CLIENT_FOOD_DETAIL = "/food?id=:foodId"; // course manage
export const ROUTE_CLIENT_INSTRUCTOR_DETAIL = "/instructor?id=:instructorId"; // course manage
export const ROUTE_CLIENT_COURSE_DETAIL = "/course?id=:courseId"; // course manage
export const ROUTE_CLIENT_FAVORITES = "/favorites";
// individual feature
export const ROUTE_CLIENT_MY_PROFILE = "/my-profile";
export const ROUTE_CLIENT_MY_ORDERS = "/my-orders";
export const ROUTE_CLIENT_MY_COURSES = "/my-courses";
export const ROUTE_CLIENT_MY_COURSE_DETAIL = "/my-course?id=courseId";
export const ROUTE_CLIENT_MY_EXAMINATION_OF_COURSE =
  "/examination?courseId=courseId";
