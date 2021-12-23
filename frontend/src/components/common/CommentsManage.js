import { Comment, Avatar, Form, List, Input } from "antd";
import moment from "moment";
import "moment/locale/vi";
import { useEffect, useState } from "react";
import { uuid } from "utils/stringUtils";
import ReplyIcon from "@material-ui/icons/Reply";
import ECookIcon from "assets/images/logoECook.png";

const { TextArea } = Input;

const CommentList = ({ comments, setComments, onSubmit, currentUser }) => {
  const [valueReplys, setValueReplys] = useState([]);

  useEffect(() => {
    setValueReplys(
      comments.map((item) => ({ id: item.feedbackId, replyContent: "" }))
    );
  }, [comments]);
  return (
    <List
      dataSource={comments}
      header={`${comments.length} phản hồi`}
      itemLayout="horizontal"
      renderItem={(props) => (
        <div>
          <Comment {...props} />
          <div
            style={{
              marginLeft: 40,
              marginTop: "-8px",
              cursor: "pointer",
              height: 20,
            }}
            className="flex items-center"
            onClick={() => {
              let temp = [...comments];
              temp.forEach((item) => {
                if (item.feedbackId === props.feedbackId) {
                  item.openReply = !item.openReply;
                } else {
                  item.openReply = false;
                }
              });
              setComments(temp);
            }}
          >
            <ReplyIcon color="action" style={{ fontSize: 18 }} />
            <div style={{ marginLeft: 4, fontSize: 12, color: "gray" }}>
              Trả lời
            </div>
          </div>
          {/* reply list */}
          {props.openReply && (
            <div style={{ marginLeft: 50, marginTop: "5px", marginBottom: 12 }}>
              {props.replyList.map((rep) => (
                <div
                  className="flex items-center"
                  style={{ marginBottom: 4 }}
                  key={rep._id}
                >
                  <Avatar src={rep?.user?.imageUrl} alt="User" />
                  <span style={{ marginLeft: 6 }}>{rep.content} </span>
                </div>
              ))}
            </div>
          )}
          <div style={{ marginLeft: 50, marginTop: 6 }}>
            {props.openReply && (
              <Form.Item>
                <TextArea
                  rows={2}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      let temp = [...comments];
                      temp.forEach((item) => {
                        if (item.feedbackId === props.feedbackId) {
                          let tempReply = item.replyList;
                          tempReply.push({
                            _id: uuid(),
                            user: currentUser,
                            feedbackId: props.feedbackId,
                            content: valueReplys.find(
                              (v) => v.id === props.feedbackId
                            )?.replyContent,
                          });
                          item.replyList = tempReply;
                          onSubmit({
                            idFeedback: item.feedbackId,
                            replyList: tempReply,
                          });
                        }
                      });
                      setComments(temp);
                    }
                  }}
                  onChange={(e) => {
                    let temp = [...valueReplys];
                    temp.forEach((item) => {
                      if (item.id === props.feedbackId) {
                        item.replyContent = e.target.value;
                      }
                    });
                    setValueReplys(temp);
                  }}
                  value={
                    valueReplys.find((v) => v.id === props.feedbackId)
                      ?.replyContent
                  }
                />
              </Form.Item>
            )}
          </div>
        </div>
      )}
    />
  );
};

const CommentsManage = ({ data, handleReply }) => {
  const [comments, setComments] = useState([]);

  // fetch API get current user
  const currentUser = {
    userId: uuid(), // user feedback
    fullName: "Duc Trong",
    imageUrl: ECookIcon,
  };

  useEffect(() => {
    if (!data?.length) return;
    setComments(
      data.map((item) => ({
        author: item.user?.fullName,
        avatar: item.user?.imageUrl,
        content: <p>{item?.content}</p>,
        datetime: moment(item?.creatAt).fromNow(),
        openReply: false,
        feedbackId: item._id,
        replyList: item.reply,
      }))
    );
    // eslint-disable-next-line
  }, [data]);

  return (
    <>
      {comments.length > 0 && (
        <CommentList
          comments={comments}
          setComments={setComments}
          onSubmit={handleReply}
          currentUser={currentUser}
        />
      )}
    </>
  );
};

export default CommentsManage;
