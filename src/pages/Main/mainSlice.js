import { createSlice } from "@reduxjs/toolkit";
import { newStoriesUrl, storyUrl } from "../../api";

export const mainSlice = createSlice({
  name: "main",
  initialState: {
    stories: [],
    story: [],
    isLoading: false,
    error: false,
  },
  reducers: {
    setStories: (state, action) => {
      state.stories = [...action.payload];
      state.isLoading = false;
    },
    setStory: (state, action) => {
      state.story = { ...state.story, ...action.payload };
      state.isLoading = false;
    },
    setClearComments: (state) => {
      state.story.kidsData = [];
    },
    setClear: (state) => {
      state.story = [];
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setStories,
  setStory,
  setClearComments,
  setClear,
  startLoading,
  hasError,
} = mainSlice.actions;

export const fetchStories = () => async (dispatch) => {
  try {
    let allStoryIds = await fetch(`${newStoriesUrl}`).then((res) => res.json());
    const filterIds = allStoryIds.slice(0, 100);

    dispatch(startLoading());
    const result = await Promise.all(
      filterIds.map(async (id) => {
        const res = await fetch(`${storyUrl}${id}.json`).then((res) =>
          res.json(),
        );
        return res;
      }),
    );
    dispatch(setStories(result));
  } catch (e) {
    dispatch(hasError(e.message));
  }
};

export const fetchStory = (id) => async (dispatch) => {
  try {
    dispatch(setClear());
    dispatch(startLoading());
    let result = await fetch(`${storyUrl}${id}.json`).then((res) => res.json());

    dispatch(setStory(result));

    if (result.kids) {
      dispatch(fetchComments(result.kids));
    } else {
      dispatch(setClearComments());
    }
  } catch (e) {
    dispatch(hasError(e.message));
  }
};

export const fetchComments = (ids) => async (dispatch) => {
  try {
    dispatch(startLoading());
    let result = await Promise.all(
      ids.map(async (id) => {
        const res = await fetch(`${storyUrl}${id}.json`).then((res) =>
          res.json(),
        );
        return res;
      }),
    );
    dispatch(setStory({ kidsData: result }));
  } catch (e) {
    dispatch(hasError(e.message));
  }
};

export const fetchNestedComments = (ids, commentId) => async (
  dispatch,
  getState,
) => {
  try {
    let result = await Promise.all(
      ids.map(async (id) => {
        const res = await fetch(`${storyUrl}${id}.json`).then((res) =>
          res.json(),
        );
        return res;
      }),
    );
    let copyStory = JSON.parse(JSON.stringify(getState().main.story));

    copyStory.kidsData.forEach((el) => {
      if (el.id === commentId) {
        el.kidsData = result;
      }
    });

    dispatch(setStory({ ...copyStory }));
  } catch (e) {
    dispatch(hasError(e.message));
  }
};

export const selectMain = (state) => state.main;

export default mainSlice.reducer;
