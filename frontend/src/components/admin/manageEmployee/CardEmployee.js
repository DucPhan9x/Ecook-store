import { Paper } from "@material-ui/core";
import React from "react";
import PhoneIcon from "@material-ui/icons/Phone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import Checkbox from "@material-ui/core/Checkbox";
import LockIcon from "@material-ui/icons/Lock";

const CardEmployee = ({ data, setData, items }) => {
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
        style={{ marginLeft: 15 }}
      />
      <div className="block-information-employee">
        <span className="block-information-employee--full-name">
          {data?.fullName || "Empty"}
        </span>
        <span
          className="block-information-employee--role"
          style={{
            color: data?.roleId === 3 ? "rgb(95, 121, 131)" : "chocolate",
          }}
        >
          {data?.roleId === 3 ? "Nhân viên" : "Giáo viên"}
        </span>
        <span className="block-information-employee--phone-number">
          <PhoneIcon /> {data?.phoneNumber || "Empty"}
        </span>
        <span className="block-information-employee--email">
          <MailOutlineIcon /> {data?.email || "Empty"}
        </span>
        {!data.isActive && (
          <span className="invalid-feedback-error">Chưa xác thực email !</span>
        )}
      </div>
      <Checkbox
        className="radio-checked-container"
        checked={data?.isSelected}
        onChange={(e) => {
          e.stopPropagation();
          let temp = [...items];
          temp.forEach((item) => {
            if (item._id === data._id) {
              item.isSelected = e.target.checked;
            }
          });
          setData(temp);
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
