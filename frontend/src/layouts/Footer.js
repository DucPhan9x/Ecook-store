import React from "react";
import { Grid } from "@material-ui/core";
import { Button } from "antd/lib/radio";
import { FormBox } from "components/common";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import AvTimerIcon from "@material-ui/icons/AvTimer";
import DescriptionIcon from "@material-ui/icons/Description";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__inner">
        <Grid className="wrapper--grid-item" container spacing={3}>
          <Grid container item xs={3} spacing={2}>
            <Grid item xs={12}>
              <span className="footer-item--title" style={{ fontSize: "22px" }}>
                E
              </span>
              <span
                className="footer-item--title"
                style={{ color: "orange", fontSize: "22px" }}
              >
                Cook
              </span>
            </Grid>
            <Grid item xs={12}>
              <PhoneInTalkIcon />
              <span>1900 1005</span>
            </Grid>
            <Grid item xs={12}>
              <AvTimerIcon />
              <span>08:00 - 22:00</span>
            </Grid>
          </Grid>
          <Grid container item xs={3} spacing={2}>
            <Grid item xs={12}>
              <span className="footer-item--title">Chi tiết</span>
            </Grid>
            <Grid item xs={12}>
              <LockOpenIcon />
              <span
                className="pointer"
                onClick={() => window.open("https://www.cooky.vn/privacy")}
              >
                Chính sách bảo mật
              </span>
            </Grid>
            <Grid item xs={12}>
              <DescriptionIcon />
              <span
                className="pointer"
                onClick={() => window.open("https://www.cooky.vn/terms")}
              >
                Điều khoản sử dụng
              </span>
            </Grid>
          </Grid>
          <Grid container item xs={3} spacing={2}>
            <Grid item xs={12}>
              <span className="footer-item--title">Theo dõi</span>
            </Grid>
            <Grid item xs={12}>
              <FacebookIcon className="icon--face" />
              <span
                className="pointer"
                onClick={() =>
                  window.open("https://www.facebook.com/admincooker")
                }
              >
                Facebook
              </span>
            </Grid>
            <Grid item xs={12}>
              <InstagramIcon className="icon--instagram" />
              <span className="pointer">Instagram</span>
            </Grid>
            <Grid item xs={12}>
              <TwitterIcon className="icon--twitter" />
              <span className="pointer">Twitter</span>
            </Grid>
          </Grid>
          <Grid container item xs={3} spacing={2}>
            <Grid item xs={12}>
              <span className="footer-item--title">Liên hệ hỗ trợ</span>
            </Grid>
            <Grid item xs={12}>
              <div>
                <FormBox
                  className="input"
                  propsInput={{
                    name: "userName",
                    placeholder: "Nội dung",
                    onChange: () => {},
                    onFocus: () => {},
                    value: "",
                    disabled: false,
                  }}
                  // error={error.userName}
                />
                <Button className="btn btn--send">Gửi</Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
