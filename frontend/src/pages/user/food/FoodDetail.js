import { Rating } from "@material-ui/lab";
import Chip from "@material-ui/core/Chip";
import { BackPreviousPage, SpinLoading } from "components/common";
import Comments from "components/common/Comments";
import React, { useEffect, useState } from "react";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FeedbackIcon from "@material-ui/icons/Feedback";
import ScrollToTop from "components/common/ScrollToTop";
import FoodCard from "components/common/card/FoodCard";
import { formatCurrency, getPriceItem } from "utils/priceUtils";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DescriptionIcon from "@material-ui/icons/Description";
import { useHistory } from "react-router-dom";
import { getAccessToken } from "utils/authUtils";
import ModalConfirm from "components/common/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import { getFoodById } from "redux/actions/food";
import { getFoodType } from "utils/convertUtils";
import foodAPI from "api/foodAPI";
import NoImage from "assets/images/notImage.png";

import recipeAPI from "api/recipeAPI";
import { updateWishlist } from "redux/actions/wishlist";
import { buyNow, createCartItems } from "redux/actions/cart";
import { addFeedback } from "redux/actions/feedbackReply";

const FoodDetail = () => {
  const [food, setFood] = useState({});
  const history = useHistory();
  const [rate, setRate] = useState(0);
  const [foodRelated, setFoodRelated] = useState([]);
  const [recipesRelated, setRecipeRelated] = useState([]);
  const [l1, setL1] = useState(true);
  const [l2, setL2] = useState(true);

  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);
  const dispatch = useDispatch();
  const { getFoodByIdState } = useSelector((store) => store.food);
  const params = new URLSearchParams(window.location.search);
  const foodID = params.get("id");

  useEffect(() => {
    document.title = "Chi tiết sản phẩm | ECook";

    window.scrollTo(0, 0);

    dispatch(getFoodById(foodID));
  }, [dispatch, foodID]);

  useEffect(() => {
    const t = getFoodByIdState.data || {};
    setFood(t);
    setRate(t?.numOfStars || 0);
  }, [getFoodByIdState]);

  useEffect(() => {
    if (food.name) {
      const t = food.name;
      setL1(true);
      foodAPI
        .getListFoodRelated(t)
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            setFoodRelated(res.foods);
            setL1(false);
          }
        });

      //
      setL2(true);
      recipeAPI
        .getListRecipeRelated(t)
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            setRecipeRelated(res.recipes);
            setL2(false);
          }
        });
    }
  }, [food]);

  const [formFeedback, setFormFeedback] = useState({ rating: 0, comment: "" });
  const { updateWishlistState } = useSelector((store) => store.wishlist);
  const { createCartItemsState } = useSelector((store) => store.cart);

  return (
    <div className="food-detail-container">
      {(getFoodByIdState?.loading ||
        l1 ||
        l2 ||
        updateWishlistState.loading ||
        createCartItemsState.loading) && <SpinLoading />}
      <BackPreviousPage />
      <div className="food-detail-container-top">
        <div className="food-detail-container-top__left">
          <img src={food?.imageUrl || NoImage} alt="" />
          <div className="flex items-center minor-image">
            <img src={food?.imageUrl || NoImage} alt="" />
          </div>
        </div>
        <div className="food-detail-container-top__right">
          <div className="flex">
            <div className="flex flex-col food-detail-container-top__right--title">
              <h3>{food?.name}</h3>
              <div>
                <span>
                  {getFoodType(food.typeId)} - (1 {food.unit})
                </span>
                <div>{food.description}</div>
              </div>
            </div>

            <Rating defaultValue={0} value={rate} max={5} readOnly />
          </div>

          <div className="food-detail-container-top__right--price">
            {food.discountOff !== 0 && (
              <div className="unit-price">{formatCurrency(food.unitPrice)}</div>
            )}
            <div className="block__disCountOff">
              {food.discountOff !== 0 && (
                <span className="discountOff">
                  -{" "}
                  {formatCurrency(
                    food.unitPrice * (food.discountOff / 100) >
                      food.discountMaximum
                      ? food.discountMaximum
                      : food.unitPrice * (food.discountOff / 100)
                  )}
                </span>
              )}
              <span className="real-price">
                {getPriceItem(
                  food.discountOff,
                  food.unitPrice,
                  food.discountMaximum
                )}
              </span>
            </div>
          </div>
          <div className="food-detail-container-top__right--actions">
            <button
              className="btn btn--favorite"
              onClick={() => {
                if (getAccessToken()) {
                  // call API add cart
                  dispatch(updateWishlist({ itemId: food._id, itemType: 1 }));
                } else {
                  setIsOpenModalConfirm(true);
                }
              }}
            >
              <FavoriteBorderIcon />
            </button>
            <button
              className="btn btn--add-to-cart"
              onClick={() => {
                if (getAccessToken()) {
                  // call API add cart
                  dispatch(
                    createCartItems({
                      itemId: food._id,
                      itemType: 1,
                      quantity: 1,
                    })
                  );
                } else {
                  setIsOpenModalConfirm(true);
                }
              }}
            >
              <ShoppingCartIcon />
              Thêm vào giỏ hàng
            </button>
            <button
              className="btn btn--buy-now"
              onClick={() => {
                if (getAccessToken()) {
                  dispatch(
                    createCartItems(
                      {
                        itemId: food._id,
                        itemType: 1,
                        quantity: 1,
                      },
                      (res) => {
                        if (res.status === 201) {
                          setTimeout(() => {
                            dispatch(buyNow(food._id));
                          }, 300);
                        }
                      }
                    )
                  );
                } else {
                  setIsOpenModalConfirm(true);
                }
              }}
            >
              Mua ngay
            </button>
          </div>
          <div className="block__recipe__related">
            <span className="block__recipe__related--title">
              <DescriptionIcon />
              Những công thức thường được tìm kiếm
            </span>
            <div className="block__recipe__related--body">
              {recipesRelated?.length > 0 ? (
                recipesRelated?.map((r) => (
                  <Chip
                    style={{ margin: 5 }}
                    key={r._id}
                    onClick={() => {
                      if (getAccessToken()) {
                        history.push(`/recipe?id=${r._id}`);
                      } else {
                        setIsOpenModalConfirm(true);
                      }
                    }}
                    label={r.name}
                    variant="outlined"
                  />
                ))
              ) : (
                <div style={{ color: "gray" }}>Hiện tại chưa có</div>
              )}
            </div>
          </div>
        </div>
      </div>
      {getAccessToken() && (
        <div className="food-detail-container-bottom">
          <div className="flex items-center" style={{ marginBottom: 12 }}>
            <span
              style={{
                marginRight: 36,
                color: "orangered",
                fontWeight: "bold",
              }}
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
            data={food.feedbacks}
            formFeedback={formFeedback}
            handleReply={(replyList) => {
              // create reply , call API
              console.log(replyList);
            }}
            handleFeedback={(comment) => {
              // check if stars > 3 => call API send feedback
              setFormFeedback({ ...formFeedback, comment });
              const input = {
                numOfStars: formFeedback.rating,
                content: comment[comment?.length - 1].content,
                itemId: foodID,
                feedbackType: 1,
              };
              dispatch(addFeedback(input));
              // CALL API add feedback for this recipe id
            }}
          />
        </div>
      )}

      {foodRelated?.length > 0 && (
        <div className="food-detail__related">
          <div className="food-detail__related--title">
            <AssignmentIcon color="secondary" />
            <span>Sản phẩm liên quan</span>
          </div>
          <div className="food-detail__related--body">
            {foodRelated?.map((item) => (
              <FoodCard key={item._id} data={item} />
            ))}
          </div>
        </div>
      )}
      <ScrollToTop />
      <ModalConfirm
        title="Thông báo"
        message="Bạn cần đăng nhập để tiếp tục, bạn muốn tiếp tục ?"
        isOpenModal={isOpenModalConfirm}
        close={() => setIsOpenModalConfirm(false)}
        handleOk={() => {
          history.push("/login");
        }}
      />
    </div>
  );
};
export default FoodDetail;
