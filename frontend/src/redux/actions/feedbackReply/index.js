import feedbackReplyAPI from "api/feedbackReplyAPI";
import useNotification from "hooks/useNotification";
import * as types from "../../types/feedbackReply";

const getAllFeedbacksByItemId = (data, res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.GET_ALL_FEEDBACKS_BY_ITEM_ID });
    feedbackReplyAPI
      .getAllFeedbacksByItemId(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_ALL_FEEDBACKS_BY_ITEM_ID_SUCCEED,
            payload: result.feedbacks,
          });
          res(result.feedbacks);
        } else {
          dispatch({ type: types.GET_ALL_FEEDBACKS_BY_ITEM_ID_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get feedback(s) failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_ALL_FEEDBACKS_BY_ITEM_ID_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const addFeedback = (data) => {
  //{ numOfStars, content, itemId, feedbackType }
  return (dispatch) => {
    dispatch({ type: types.ADD_FEEDBACK });
    feedbackReplyAPI
      .addFeedback(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.ADD_FEEDBACK_SUCCEED,
            payload: data,
          });
        } else {
          dispatch({ type: types.ADD_FEEDBACK_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Add feedback failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.ADD_FEEDBACK_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const reply = (data) => {
  // { feedbackId, content }
  return (dispatch) => {
    dispatch({ type: types.SYSTEM_REPLY });
    feedbackReplyAPI
      .reply(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.SYSTEM_REPLY_SUCCEED,
            payload: data,
          });
        } else {
          dispatch({ type: types.SYSTEM_REPLY_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Reply to feedback failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.SYSTEM_REPLY_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

export { addFeedback, getAllFeedbacksByItemId, reply };
