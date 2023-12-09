import { createSlice } from '@reduxjs/toolkit';

export const historySlice = createSlice({
    name: 'history',
    initialState: {
        history: []
    },
    reducers: {
        addVideo: (state, action) => {
            // Check if the videoId is already in the history array
            const videoExists = state.history.some(video => video.videoId === action.payload.videoId);

            // If the videoId is not found, add the video to the history array
            if (!videoExists) {
                state.history.push(action.payload);
            }
        },
        deleteVideo: (state, action) => {
            state.history = state.history.filter(video => video.videoId !== action.payload);
        },
        setHistory: (state, action) => {
            state.history = action.payload;
        },
    }
})

export const { setHistory, addVideo, deleteVideo } = historySlice.actions;

export default historySlice.reducer;
