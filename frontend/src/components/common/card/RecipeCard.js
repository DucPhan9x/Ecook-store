import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Rating from "@material-ui/lab/Rating";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useHistory } from "react-router-dom";
import { getAccessToken } from "utils/authUtils";
import ModalConfirm from "../ModalConfirm";
import { useState } from "react";
import useNotification from "hooks/useNotification";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 260,
    backgroundColor: "#f5ffca",
    borderRadius: 16,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  action: {
    color: "#292929",
  },
}));

export default function RecipeCard({ data }) {
  const classes = useStyles();
  const { name, feedbacks, contents, imageUrl } = data;
  const history = useHistory();

  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);

  return (
    <>
      <Card className={`block--product-list--showing--item ${classes.root}`}>
        <CardHeader
          action={
            <IconButton
              aria-label="settings"
              onClick={() => {
                if (getAccessToken()) {
                  history.push(`/recipe?id=${data?._id}`);
                } else {
                  setIsOpenModalConfirm(true);
                }
              }}
            >
              <VisibilityIcon />
            </IconButton>
          }
          title={name}
        />
        <CardMedia className={classes.media} image={imageUrl} title={name} />
        <CardContent style={{ maxHeight: 80, overflow: "hidden" }}>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{
              maxWidth: 230,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {contents
              .filter((i, idx) => idx < 3)
              .map((i, idx) => `Bước ${idx + 1}. ${i}`)
              .join(". ")}
          </Typography>
        </CardContent>
        <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Typography variant="body2" color="textSecondary" component="p">
            ...xem tiếp
          </Typography>
        </CardContent>
        <CardActions disableSpacing className="flex j-space-between">
          <Rating defaultValue={feedbacks} max={5} readOnly />

          <IconButton
            aria-label="add to favorites"
            onClick={() => {
              if (getAccessToken()) {
                // call API add cart
                useNotification.Success({
                  title: "",
                  message: "Đã thêm vào bộ sưu tập",
                });
              } else {
                setIsOpenModalConfirm(true);
              }
            }}
          >
            <FavoriteIcon color="secondary" />
          </IconButton>
        </CardActions>
      </Card>
      <ModalConfirm
        title="Thông báo"
        message="Bạn cần đăng nhập để tiếp tục, bạn muốn tiếp tục ?"
        isOpenModal={isOpenModalConfirm}
        close={() => setIsOpenModalConfirm(false)}
        handleOk={() => {
          history.push("/login");
        }}
      />
    </>
  );
}
