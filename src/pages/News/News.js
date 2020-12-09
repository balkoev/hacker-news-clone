import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-spinner-material";

import CommentComponent from "../../components/Comment";
import { fetchStory, selectMain } from "../Main/mainSlice";
import {
  Container,
  Header,
  Item,
  SpinnerWrapper,
  RefreshButton,
} from "../styled";
import { timeSince } from "../../helpers";

const News = () => {
  let { id } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();
  const { story, isLoading } = useSelector(selectMain);

  useEffect(() => {
    dispatch(fetchStory(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!story) {
      dispatch(fetchStory(id));
    }
    const interval = setInterval(() => dispatch(fetchStory(id)), 60000);
    return () => clearInterval(interval);
  }, [dispatch, story, id]);

  const handleClick = () => {
    history.push("/");
  };

  const handleRefresh = (isLoading) => {
    if (!isLoading) dispatch(fetchStory(id));
  };

  return (
    <Container>
      <Header>
        Hacker News (Custom version){" "}
        <RefreshButton
          isDisabled={isLoading}
          onClick={() => handleRefresh(isLoading)}
        >
          refresh
        </RefreshButton>
      </Header>
      {isLoading ? (
        <SpinnerWrapper>
          <Spinner
            size={120}
            color={"#ff6600"}
            stroke={5}
            visible={isLoading}
          />
        </SpinnerWrapper>
      ) : (
        <>
          <Item>
            <Item.Content>
              <Item.Title>{story.title}</Item.Title>
              {story.url && (
                <>
                  <span> – </span>
                  <Item.Link href={`${story.url}`}>link</Item.Link>
                </>
              )}
              <Item.Meta>
                <Item.Score>{story.score} point by </Item.Score>
                <Item.Author>{story.by} </Item.Author>
                <Item.Date>{timeSince(story.time)} ago | </Item.Date>
                <Item.Count>
                  {story.kids ? story.kids.length : 0} comments
                </Item.Count>
              </Item.Meta>
              <div dangerouslySetInnerHTML={{ __html: story.text }}></div>
            </Item.Content>
            <Item.Button type="button" onClick={handleClick}>
              back to list
            </Item.Button>
          </Item>

          {story.kidsData &&
            story.kidsData.map((comment) => (
              <CommentComponent key={comment.id} comment={comment} />
            ))}
        </>
      )}
    </Container>
  );
};

export default News;
