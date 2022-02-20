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
    case 4:
      return "Rau củ quả";

    default:
      return "Tất cả";
  }
};

export const getFoodTypeId = (roleId) => {
  switch (roleId) {
    case "Thịt heo, bò":
      return 1;

    case "Thủy hải sản":
      return 2;

    case "Gia cầm":
      return 3;

    case "Rau củ, quả":
      return 4;

    default:
      return 0;
  }
};
