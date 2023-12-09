import {configureStore} from '@reduxjs/toolkit';
import sideBarReducer from '../features/sideBarSlice';
import searchReducer from '../features/searchSlice';
import authReducer from '../features/authSlice';
import resultsReducer from '../features/resultsSlice';
import historyReducer from '../features/historySlice';

export default configureStore({
    reducer: {
        sideBar: sideBarReducer,
        search: searchReducer,
        auth: authReducer,
        results: resultsReducer,
        history: historyReducer,
    }
})
