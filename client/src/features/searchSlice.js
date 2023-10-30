import {createSlice} from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        text: ""
    },
    reducers: {
        setText: (state, action) => {
            state.text = action.payload;
        },
    }
})

export const {setText} = searchSlice.actions;

export default searchSlice.reducer;