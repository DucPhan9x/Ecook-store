import { Rating } from "@material-ui/lab";
import { BackPreviousPage, SpinLoading } from "components/common";
import Comments from "components/common/Comments";
import useNotification from "hooks/useNotification";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FeedbackIcon from "@material-ui/icons/Feedback";
import RecipeCard from "components/common/card/RecipeCard";
import ScrollToTop from "components/common/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeById } from "redux/actions/recipe";
import recipeAPI from "api/recipeAPI";
import NoImage from "assets/images/notImage.png";

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState({});
  const [rate, setRate] = useState(0);
  const [l1, setL1] = useState(true);
  const [recipeRelated, setRecipeRelated] = useState([]);
  const dispatch = useDispatch();
  const { getRecipeByIdState } = useSelector((store) => store.recipe);

  useEffect(() => {
    document.title = "Chi tiết công thức | ECook";
    window.scrollTo(0, 0);

    const params = new URLSearchParams(window.location.search);
    const recipeID = params.get("id");
    if (!recipeID) {
      return;
    }
    dispatch(getRecipeById(recipeID));
  }, [dispatch]);

  useEffect(() => {
    const t = getRecipeByIdState.data || {};
    setRecipe(t);
    setRate(t?.numOfStars || 0);
  }, [getRecipeByIdState]);

  useEffect(() => {
    if (!recipe.name) return;
    //
    setL1(true);
    recipeAPI
      .getListRecipeRelated(recipe.name)
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setRecipeRelated(res.recipes);
          setL1(false);
        }
      });
  }, [recipe]);

  const [formFeedback, setFormFeedback] = useState({ rating: 0, comment: "" });

  return (
    <div className="recipe-detail-container">
      {(getRecipeByIdState?.loading || l1) && <SpinLoading />}
      <BackPreviousPage />
      <div className="recipe-detail-container-top">
        <div className="recipe-detail-container-top__left">
          <img
            style={{ maxWidth: 350 }}
            src={recipe?.imageUrl || NoImage}
            alt=""
          />
          <div className="flex items-center minor-image">
            <img src={recipe?.imageUrl || NoImage} alt="" />
          </div>
        </div>
        <div className="recipe-detail-container-top__right">
          <div className="flex">
            <h3 className="recipe-detail-container-top__right--title">
              {recipe?.name}
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
              {recipe?.materials?.map((m, idx) => (
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
                  Bước {idx + 1}. {c}
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
          data={recipe?.feedbacksList}
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
      {recipeRelated?.length > 0 && (
        <div className="recipe-detail__related">
          <div className="recipe-detail__related--title">
            <AssignmentIcon color="secondary" />
            <span>Công thức liên quan</span>
          </div>
          <div className="recipe-detail__related--body">
            {recipeRelated?.map((item) => (
              <RecipeCard key={item._id} data={item} />
            ))}
          </div>
        </div>
      )}
      <ScrollToTop />
    </div>
  );
};
export default RecipeDetail;
