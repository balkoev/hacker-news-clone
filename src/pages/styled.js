import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  max-width: 1058px;
  margin: 0 auto;
  background-color: rgb(246, 246, 239);
`;

export const Header = styled.div`
  && {
    background-color: rgb(255, 102, 0);
    font-size: 14px;
    font-weight: bold;
    padding: 0 10px;
    height: 24px;
    display: flex;
    align-items: center;
  }
`;

export const LinkStyled = styled(Link)`
  color: #000000;
  text-decoration: none;

  :visited {
    color: #828282;
  }
`;

const ItemBlock = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  padding: 5px 10px;
  position: relative;
`;

const ItemNumber = styled.div`
  margin: 0 10px 0 0;
  color: #828282;
`;

const ItemMeta = styled.div`
  color: #828282;
  font-size: 10px;
`;

const ItemText = styled.div``;

const ItemAuthor = styled.span``;

const ItemScore = styled.span``;

const ItemDate = styled.span``;

const ItemCount = styled.span``;

const ItemContent = styled.div``;

const ItemTitle = styled.span`
  color: #000000;
`;

const ItemLink = styled.a`
  color: #828282;
`;

const ItemButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export class Item extends React.Component {
  static Number = ItemNumber;
  static Meta = ItemMeta;
  static Content = ItemContent;
  static Title = ItemTitle;
  static Link = ItemLink;
  static Button = ItemButton;
  static Author = ItemAuthor;
  static Date = ItemDate;
  static Score = ItemScore;
  static Count = ItemCount;
  static Text = ItemText;

  render() {
    return <ItemBlock>{this.props.children}</ItemBlock>;
  }
}

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

export const RefreshButton = styled.span`
  color: white;
  text-decoration: underline;
  margin: 0 5px;
  cursor: pointer;
  user-select: none;
`;
