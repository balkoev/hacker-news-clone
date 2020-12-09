import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { fetchNestedComments } from "../pages/Main/mainSlice";
import { Comment } from "./styled";
import { timeSince } from "../helpers";

const CommentComponent = ({ comment }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const [showChildren, setShowChildren] = useState(false);

  const handleToggleComment = () => {
    setIsOpen(!isOpen);

    if (isOpen) setShowChildren(false);
  };

  const openNestedComments = (kidsId, commentId) => {
    dispatch(fetchNestedComments(kidsId, commentId));
    setShowChildren(!showChildren);
  };

  return (
    <Comment>
      <Comment.Content>
        <Comment.Meta>
          <Comment.Author>{comment.by}</Comment.Author>
          <Comment.Date>{timeSince(comment.time)} ago</Comment.Date>
          <Comment.Count onClick={handleToggleComment}>
            [{isOpen ? " – " : " + "}]
          </Comment.Count>
        </Comment.Meta>
        <Comment.Text
          isOpen={isOpen}
          dangerouslySetInnerHTML={{ __html: comment.text }}
        />
        {isOpen && comment.kids && (
          <div
            style={{ color: "blue" }}
            onClick={() => openNestedComments(comment.kids, comment.id)}
          >
            nested comments ({comment.kids.length}) [
            {showChildren ? " – " : " + "}]
          </div>
        )}
        {comment.kidsData &&
          showChildren &&
          comment.kidsData.map((comment) => {
            if (comment.deleted) return null;
            return (
              <Comment key={comment.id}>
                <Comment.Content>
                  <Comment.Meta style={{ marginLeft: "25px" }}>
                    <Comment.Author>{comment.by}</Comment.Author>
                    <Comment.Date>{timeSince(comment.time)} ago</Comment.Date>
                  </Comment.Meta>
                  <Comment.Text
                    style={{ marginLeft: "25px" }}
                    isOpen={isOpen}
                    dangerouslySetInnerHTML={{ __html: comment.text }}
                  />
                  {comment.kids && (
                    <div
                      style={{ color: "blue", marginLeft: "25px" }}
                      onClick={() =>
                        openNestedComments(comment.kids, comment.id)
                      }
                    >
                      nested comments ({comment.kids.length})[
                      {showChildren ? " – " : " + "}]
                    </div>
                  )}
                </Comment.Content>
              </Comment>
            );
          })}
      </Comment.Content>
    </Comment>
  );
};

export default CommentComponent;
