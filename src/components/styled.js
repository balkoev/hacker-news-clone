import React from "react";
import styled from "styled-components";

const CommentBlock = styled.div`
  font-size: 14px;
  padding: 5px 10px;
`;

const CommentContent = styled.div``;

const CommentMeta = styled.div`
  display: flex;
  flex-direction: row;
  color: #828282;
  font-size: 12px;
`;

const CommentAuthor = styled.span`
  margin-right: 5px;
`;

const CommentDate = styled.span`
  margin-right: 5px;
`;

const CommentCount = styled.span`
  margin-right: 5px;
  cursor: pointer;
`;

const CommentText = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  font-size: 14px;
  margin-left: 10px;
`;

export class Comment extends React.Component {
  static Content = CommentContent;
  static Meta = CommentMeta;
  static Author = CommentAuthor;
  static Date = CommentDate;
  static Count = CommentCount;
  static Text = CommentText;

  render() {
    return <CommentBlock>{this.props.children}</CommentBlock>;
  }
}
