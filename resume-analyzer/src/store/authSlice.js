import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  subscription: 'standard', // 'standard', 'premium', 'professional'
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.subscription = action.payload.subscription;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.subscription = 'standard';
    },
    updateSubscription: (state, action) => {
      state.subscription = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateSubscription } = authSlice.actions;

export default authSlice.reducer;