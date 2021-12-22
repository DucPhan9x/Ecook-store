import { Comment, Avatar, Form, Button, List, Input } from "antd";
import moment from "moment";
import "moment/locale/vi";
import { useEffect, useState } from "react";
import { uuid } from "utils/stringUtils";
import ReplyIcon from "@material-ui/icons/Reply";
import ECookIcon from "assets/images/logoECook.png";

const { TextArea } = Input;

const CommentList = ({ comments, setComments }) => {
  const [valueReply, setValueReply] = useState("");

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
          {props.openReply && (
            <div style={{ marginLeft: 50, marginTop: "5px", marginBottom: 12 }}>
              {props.replyList.map((rep) => (
                <div
                  className="flex items-center"
                  style={{ marginBottom: 4 }}
                  key={rep._id}
                >
                  <Avatar src={ECookIcon} alt="ECook" />
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
                            feedbackId: props.feedbackId,
                            content: valueReply,
                          });
                          item.replyList = tempReply;
                        }
                      });
                      setValueReply("");
                      setComments(temp);
                    }
                  }}
                  onChange={(e) => {
                    setValueReply(e.target.value);
                  }}
                  value={valueReply}
                />
              </Form.Item>
            )}
          </div>
        </div>
      )}
    />
  );
};

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={3} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Đánh giá
      </Button>
    </Form.Item>
  </>
);

const Comments = ({ handleFeedback, data }) => {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");

  // fetch API get current user
  const currentUser = {
    userId: uuid(), // user feedback
    fullName: "Duc Trong",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
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

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!value) {
      return;
    }

    setSubmitting(true);
    handleFeedback(value);
    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComments([
        ...comments,
        {
          author: currentUser.fullName,
          avatar: currentUser.imageUrl,
          content: <p>{value}</p>,
          datetime: moment(Date.now() - 365 * 24 * 3600 * 1000).fromNow(),
          openReply: false,
          feedbackId: uuid(),
          replyList: [],
        },
      ]);
    }, 1000);
  };

  return (
    <>
      {comments.length > 0 && (
        <CommentList comments={comments} setComments={setComments} />
      )}
      <Comment
        avatar={<Avatar src={currentUser.imageUrl} alt="Han Solo" />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </>
  );
};

export default Comments;
