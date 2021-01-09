import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    loading:false,
    ready:false,
    initialized:false
  },
  reducers: {
    setCreateScript: state => {
      state.loading = true;
    },

    setSDKReady: (state, action) => {
        state.ready = true
    },

    setPlayerInit: (state, action) => {
        state.initialized = true
    },
    
  },
});

export const { setCreateScript, setSDKReady, setPlayerInit } = playerSlice.actions;


export const selectPlayerDomain = state => state.player;

export const selectPlayerLoading = createSelector(
  selectPlayerDomain,
  player => player.loading
);

export const selectPlayerReady = createSelector(
  selectPlayerDomain,
  player => player.ready
);



export const selectPlayerInitialized = createSelector(
  selectPlayerDomain,
  player => player.initialized
);





export default playerSlice.reducer;
