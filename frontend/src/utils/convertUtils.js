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

export const getFoodType = (roleId) => {
  switch (roleId) {
    case 1:
      return "Thịt heo, bò";

    case 2:
      return "Thủy hải sản";

    case 3:
      return "Gia cầm";

    default:
      return "Rau củ, quả";
  }
};
