import { Paper } from "@material-ui/core";
import React from "react";
import PhoneIcon from "@material-ui/icons/Phone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

const CardEmployee = ({ data }) => {
  return (
    <Paper className="card-employee">
      <img className="avatar-employee" src={data?.imageUrl} alt="" />
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
        {/* <span className="block-information-employee--view-details">
          Xem chi tiết
        </span> */}
      </div>
    </Paper>
  );
};
export default CardEmployee;
