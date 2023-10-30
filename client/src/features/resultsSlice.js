import { createSlice } from "@reduxjs/toolkit";

export const resultsSlice = createSlice({
  name: "results",
  initialState: {
    videos: [],
    videosInfo: [],
    channels: [],
    page: "",
    totalCount: 0,
    scrollPosition: 0,
    prevPage: "",
    videoId: "",
  },
  reducers: {
    setVideosGlobal: (state, action) => {
      state.videos = action.payload;
    },
    setVideosInfoGlobal: (state, action) => {
      state.videosInfo = action.payload;
    },
    setChannelsGlobal: (state, action) => {
      state.channels = action.payload;
    },
    setPageGlobal: (state, action) => {
      state.page = action.payload;
    },
    setTotalCountGlobal: (state, action) => {
      state.totalCount = action.payload;
    },
    setScrollPosition: (state, action) => {
      state.scrollPosition = action.payload;
    },
    setPrevPage: (state, action) => {
      state.prevPage = action.payload;
    },
    setVideoId: (state, action) => {
      state.videoId = action.payload;
    },
  },
});

export const {
  setVideosGlobal,
  setVideosInfoGlobal,
  setChannelsGlobal,
  setPageGlobal,
  setTotalCountGlobal,
  setScrollPosition,
  setPrevPage,
  setVideoId
} = resultsSlice.actions;

export default resultsSlice.reducer;
