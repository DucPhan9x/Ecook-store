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
  const { title, feedbacks, contents, imageUrl } = data;

  return (
    <Card className={`block--product-list--showing--item ${classes.root}`}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <VisibilityIcon />
          </IconButton>
        }
        title={title}
      />
      <CardMedia className={classes.media} image={imageUrl} title={title} />
      <CardContent style={{ maxHeight: 80, overflow: "hidden" }}>
        <Typography variant="body2" color="textSecondary" component="p">
          {contents}
        </Typography>
      </CardContent>
      <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Typography variant="body2" color="textSecondary" component="p">
          ...xem tiếp
        </Typography>
      </CardContent>
      <CardActions disableSpacing className="flex j-space-between">
        <Rating name="customized-10" defaultValue={feedbacks} max={5} />

        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
