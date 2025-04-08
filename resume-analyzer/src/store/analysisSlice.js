import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  resume: null,
  jobDescription: null,
  analysisResult: null,
  matchPercentage: 0,
  recommendations: [],
  loading: false,
  error: null,
  analysisCount: 0, // For tracking free tier usage
};

const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    setResume: (state, action) => {
      state.resume = action.payload;
    },
    setJobDescription: (state, action) => {
      state.jobDescription = action.payload;
    },
    startAnalysis: (state) => {
      state.loading = true;
      state.error = null;
    },
    analysisSuccess: (state, action) => {
      state.loading = false;
      state.analysisResult = action.payload;
      state.matchPercentage = action.payload.matchPercentage;
      state.recommendations = action.payload.recommendations;
      state.analysisCount += 1;
    },
    analysisFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetAnalysis: (state) => {
      state.resume = null;
      state.jobDescription = null;
      state.analysisResult = null;
      state.matchPercentage = 0;
      state.recommendations = [];
      state.error = null;
    },
  },
});

export const {
  setResume,
  setJobDescription,
  startAnalysis,
  analysisSuccess,
  analysisFailure,
  resetAnalysis,
} = analysisSlice.actions;

export default analysisSlice.reducer;