import {createSlice} from '@reduxjs/toolkit';

export const sideBarSlice = createSlice({
    name: 'sideBar',
    initialState: {
        showSideBar: false
    },
    reducers: {
        setShowSideBar: (state, action) => {
            state.showSideBar = action.payload;
        },
        toggleSideBar: (state) => {
            state.showSideBar = !state.showSideBar;
        }
    }
})

export const {setShowSideBar, toggleSideBar} = sideBarSlice.actions;

export default sideBarSlice.reducer;