import { Rating } from "@material-ui/lab";
import { BackPreviousPage } from "components/common";
import Comments from "components/common/Comments";
import useNotification from "hooks/useNotification";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { RECIPES_DATA } from "utils/dummyData";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FeedbackIcon from "@material-ui/icons/Feedback";
import RecipeCard from "components/common/card/RecipeCard";
import ScrollToTop from "components/common/ScrollToTop";

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState({});
  const [rate, setRate] = useState(0);
  useEffect(() => {
    document.title = "Chi tiết công thức | ECook";

    window.scrollTo(0, 0);

    const params = new URLSearchParams(window.location.search);
    const recipeID = params.get("id");
    if (!recipeID) {
      return;
    }
    let t = RECIPES_DATA.find((item) => item._id === params.get("id"));
    if (t) {
      setRecipe(t);
      setRate(t.feedbacks);
    }
  }, []);

  const [formFeedback, setFormFeedback] = useState({ rating: 0, comment: "" });

  return (
    <div className="recipe-detail-container">
      <BackPreviousPage />
      <div className="recipe-detail-container-top">
        <div className="recipe-detail-container-top__left">
          <img src={recipe?.imageUrl} alt="" />
          <div className="flex items-center minor-image">
            <img src={recipe?.imageUrl} alt="" />
          </div>
        </div>
        <div className="recipe-detail-container-top__right">
          <div className="flex">
            <h3 className="recipe-detail-container-top__right--title">
              {recipe?.title}
            </h3>
            <Rating defaultValue={0} value={rate} max={5} readOnly />
          </div>

          <div className="recipe-detail-container-top__right--slotQuantity">
            <span>Định lượng: </span>
            {recipe?.slotQuantity} người ăn
          </div>

          <div className="recipe-detail-container-top__right--materials">
            <div className="recipe-detail-container-top__right--materials-label">
              Thành phần chính:
            </div>
            <div className="recipe-detail-container-top__right--materials-body">
              {recipe?.material?.map((m, idx) => (
                <div key={m._id}>
                  {idx + 1}. {m.foodName}
                  &nbsp;&nbsp;{m.quantity}
                  &nbsp;&nbsp;{m.unit}
                </div>
              ))}
            </div>
          </div>
          <div className="recipe-detail-container-top__right--contents">
            <div className="recipe-detail-container-top__right--contents-label">
              Hướng dẫn chế biến:
            </div>
            <div className="recipe-detail-container-top__right--contents-body">
              {recipe?.contents?.map((c, idx) => (
                <div
                  key={idx}
                  className="recipe-detail-container-top__right--contents-body--item"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="recipe-detail-container-bottom">
        <div className="flex items-center" style={{ marginBottom: 12 }}>
          <span
            style={{ marginRight: 36, color: "orangered", fontWeight: "bold" }}
          >
            <FeedbackIcon color="secondary" style={{ marginRight: 12 }} />
            Đánh giá & Nhận xét
          </span>
          <Rating
            value={formFeedback.rating}
            onChange={(e, value) =>
              setFormFeedback({ ...formFeedback, rating: value })
            }
          />
        </div>
        <Comments
          data={recipe.feedbacksList}
          formFeedback={formFeedback}
          handleReply={(replyList) => {
            // create reply , call API
            console.log(replyList);
          }}
          handleFeedback={(comment) => {
            // check if stars > 3 => call API send feedback
            if (formFeedback.rating > 2) {
              setFormFeedback({ ...formFeedback, comment });
              console.log({ ...formFeedback, comment });
              // CALL API add feedback for this recipe id
            } else {
              useNotification.Warning({
                title: "Message",
                message: "Bạn không thể bình luận vì đánh giá quá thấp",
              });
            }
          }}
        />
      </div>
      <div className="recipe-detail__related">
        <div className="recipe-detail__related--title">
          <AssignmentIcon color="secondary" />
          <span>Công thức liên quan</span>
        </div>
        <div className="recipe-detail__related--body">
          {RECIPES_DATA.map((item) => (
            <RecipeCard key={item._id} data={item} />
          ))}
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};
export default RecipeDetail;
