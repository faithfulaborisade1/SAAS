import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import analysisReducer from './analysisSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    analysis: analysisReducer,
  },
});

export default store;