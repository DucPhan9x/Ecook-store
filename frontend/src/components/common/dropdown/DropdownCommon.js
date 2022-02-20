import React from "react";
import { Dropdown, Button, Menu } from "antd";
import { ArrowDropDown } from "@material-ui/icons";

const DropdownCommon = ({ label, options, handleMenuClick, selectedItem }) => {
  console.log(selectedItem);
  const menu = (
    <Menu onClick={handleMenuClick} className="menu-dropdown-common">
      {options.map((o, index) => (
        <Menu.Item
          key={index}
          style={{
            background: selectedItem === o ? "#f8c557" : "",
          }}
        >
          {o}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown overlay={menu} className="dropdown-common">
      <Button>
        {label}
        <ArrowDropDown color="action" />
      </Button>
    </Dropdown>
  );
};

export default DropdownCommon;
