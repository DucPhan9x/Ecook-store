import { Rating } from "@material-ui/lab";
import Chip from "@material-ui/core/Chip";
import { BackPreviousPage } from "components/common";
import Comments from "components/common/Comments";
import useNotification from "hooks/useNotification";
import React, { useEffect, useState } from "react";
import { FOODS_DATA } from "utils/dummyData";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FeedbackIcon from "@material-ui/icons/Feedback";
import ScrollToTop from "components/common/ScrollToTop";
import FoodCard from "components/common/card/FoodCard";
import { formatCurrency, getPriceItem } from "utils/priceUtils";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DescriptionIcon from "@material-ui/icons/Description";
import { useHistory } from "react-router-dom";

const FoodDetail = () => {
  const [food, setFood] = useState({});
  const history = useHistory();
  const [rate, setRate] = useState(0);
  useEffect(() => {
    document.title = "Chi tiết sản phẩm | ECook";

    window.scrollTo(0, 0);

    const params = new URLSearchParams(window.location.search);
    const foodID = params.get("id");
    if (!foodID) {
      return;
    }
    let t = FOODS_DATA.find((item) => item._id === foodID);
    if (t) {
      setFood(t);
      setRate(t.numOfStars);
    }
  }, []);

  const [formFeedback, setFormFeedback] = useState({ rating: 0, comment: "" });

  return (
    <div className="food-detail-container">
      <BackPreviousPage />
      <div className="food-detail-container-top">
        <div className="food-detail-container-top__left">
          <img src={food?.imageUrl} alt="" />
          <div className="flex items-center minor-image">
            <img src={food?.imageUrl} alt="" />
          </div>
        </div>
        <div className="food-detail-container-top__right">
          <div className="flex">
            <div className="flex flex-col food-detail-container-top__right--title">
              <h3>{food?.name}</h3>
              <div>
                <span>{food.type} - </span>
                <span>
                  {food.description} ({food.quantity} {food.unit})
                </span>
              </div>
            </div>

            <Rating defaultValue={0} value={rate} max={5} readOnly />
          </div>

          <div className="food-detail-container-top__right--price">
            <div className="unit-price">{formatCurrency(food.unitPrice)}</div>
            <div className="block__disCountOff">
              <span className="discountOff">
                -{" "}
                {formatCurrency(
                  food.unitPrice * (food.discountOff / 100) >
                    food.discountMaximum
                    ? food.discountMaximum
                    : food.unitPrice * (food.discountOff / 100)
                )}
              </span>
              <span className="real-price">
                {formatCurrency(
                  getPriceItem(
                    food.discountOff,
                    food.unitPrice,
                    food.discountMaximum
                  )
                )}
              </span>
            </div>
          </div>
          <div className="food-detail-container-top__right--actions">
            <button className="btn btn--favorite">
              <FavoriteBorderIcon /> Lưu
            </button>
            <button className="btn btn--add-to-cart">
              <ShoppingCartIcon />
              Thêm vào giỏ hàng
            </button>
            <button className="btn btn--buy-now">Mua ngay</button>
          </div>
          <div className="block__recipe__related">
            <span className="block__recipe__related--title">
              <DescriptionIcon />
              Những công thức thường được tìm kiếm
            </span>
            <div className="block__recipe__related--body">
              {food.recipesRelated?.map((r) => (
                <Chip
                  key={r._id}
                  onClick={() => history.push(`/recipe?id=recipe_123`)}
                  label={r.title}
                  variant="outlined"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="food-detail-container-bottom">
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
          data={food.feedbacksList}
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
      <div className="food-detail__related">
        <div className="food-detail__related--title">
          <AssignmentIcon color="secondary" />
          <span>Sản phẩm liên quan</span>
        </div>
        <div className="food-detail__related--body">
          {FOODS_DATA.map((item) => (
            <FoodCard key={item._id} data={item} />
          ))}
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};
export default FoodDetail;
