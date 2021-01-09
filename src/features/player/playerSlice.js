import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    loading:false,
    ready:false,
    appConnect:false,
    paused:false,
  },
  reducers: {
    setCreateScript: state => {
      state.loading = true;
    },

    setSDKReady: (state, action) => {
        state.ready = true
    },

    setPlayerConnected: (state, action) => {
      console.log("setPlayerConnected")
      state.appConnect = true
    },

    setPlayerPause: (state, action) => {
      state.paused = true
    },
  },
});

export const {
  setCreateScript,
  setSDKReady,
  setPlayerInit,
  setPlayerConnected,
  setPlayerPause
} = playerSlice.actions;


export const selectPlayerDomain = state => state.player;

export const selectPlayerLoading = createSelector(
  selectPlayerDomain,
  player => player.loading
);

export const selectPlayerReady = createSelector(
  selectPlayerDomain,
  player => player.ready
);

export const selectPlayerIsConnected = createSelector(
  selectPlayerDomain,
  player => player.appConnect
);

export const selectPlayerWaitingToConnect = createSelector(
  selectPlayerReady,
  selectPlayerIsConnected,
  (ready, isConn) => ready && !isConn
);

export const selectPlayerIsPaused = createSelector(
  selectPlayerDomain,
  player => player.paused
);



export default playerSlice.reducer;
