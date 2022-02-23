import { Paper } from "@material-ui/core";
import React from "react";
import PhoneIcon from "@material-ui/icons/Phone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import Checkbox from "@material-ui/core/Checkbox";
import LockIcon from "@material-ui/icons/Lock";

const CardEmployee = ({ data, filterData, setFilterData }) => {
  return (
    <Paper
      className="card-employee"
      style={{ background: data?.isRemoved ? "rgb(165 164 164 / 87%)" : "" }}
    >
      <img
        className="avatar-employee"
        src={
          data?.imageUrl ||
          "https://res.cloudinary.com/duc/image/upload/v1642704006/avatardefault_ux3ryj.png"
        }
        alt=""
      />
      <div className="block-information-employee">
        <span className="block-information-employee--full-name">
          {data?.fullName}
        </span>
        <span
          className="block-information-employee--role"
          style={{
            color:
              data?.role === "employee" ? "rgb(95, 121, 131)" : "chocolate",
          }}
        >
          {data?.role === "employee" ? "Nhân viên" : "Giáo viên"}
        </span>
        <span className="block-information-employee--phone-number">
          <PhoneIcon /> {data?.phoneNumber}
        </span>
        <span className="block-information-employee--email">
          <MailOutlineIcon /> {data?.email}
        </span>
      </div>
      <Checkbox
        className="radio-checked-container"
        checked={data?.isSelected}
        onChange={(e) => {
          e.stopPropagation();
          let temp = [...filterData];
          temp.forEach((item) => {
            if (item._id === data._id) {
              item.isSelected = e.target.checked;
            }
          });
          setFilterData(temp);
        }}
      />

      {data?.isRemoved && (
        <LockIcon
          style={{ position: "absolute", bottom: 11, right: 10 }}
          onClick={() => {
            console.log("aaaaaa");
            // un-ban API
          }}
        />
      )}
    </Paper>
  );
};
export default CardEmployee;
