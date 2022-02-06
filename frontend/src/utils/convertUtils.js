export const getRoleName = (roleId) => {
  switch (roleId) {
    case 1:
      return "Customer";

    case 2:
      return "Admin";

    case 3:
      return "Employee";

    default:
      return "Instructor";
  }
};
