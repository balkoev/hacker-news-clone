import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStories, selectMain } from "./mainSlice";
import Spinner from "react-spinner-material";

import { timeSince } from "../../helpers";
import {
  Container,
  Header,
  Item,
  LinkStyled,
  SpinnerWrapper,
  RefreshButton,
} from "../styled";

const Main = () => {
  const dispatch = useDispatch();
  const { isLoading, stories } = useSelector(selectMain);

  useEffect(() => {
    if (!stories.length) {
      dispatch(fetchStories());
    }
    const interval = setInterval(() => dispatch(fetchStories()), 60000);
    return () => clearInterval(interval);
  }, [dispatch, stories]);

  const handleRefresh = (isLoading) => {
    if (!isLoading) {
      dispatch(fetchStories());
    }
  };

  return (
    <Container>
      <Header>
        Hacker News (Custom version) –
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
        stories.map((story, index) => (
          <Item key={story.id}>
            <Item.Number>{index + 1}</Item.Number>
            <Item.Content>
              <LinkStyled to={`/news/${story.id}`}>{story.title}</LinkStyled>
              <Item.Meta>
                {story.score} point by {story.by} {timeSince(story.time)} ago
              </Item.Meta>
            </Item.Content>
          </Item>
        ))
      )}
    </Container>
  );
};

export default Main;
