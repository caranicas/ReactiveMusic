import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    loading:false,
    ready:false,
    // appConnect:false,
    isActive:false,
    playing:false,

    // todo move to spotify slice?
    id:null,
    devices:[],
    track: {},
    previousTracks:[],
    nextTracks:[]

  },

  reducers: {
    setInit: state => {
      state.loading = true;
    },

    setPlayerReady: (state, action) => {
       const { payload : {devices, currentDeviceId } } = action;
        state.ready = true;
        state.id = currentDeviceId;
        state.devices = devices;
    },


    setPlayerUpdateReady: (state, action) => {
        const { payload: { isActive, isPlaying, track }} = action;
        state.isActive = isActive;
        state.playing = isPlaying;
        state.track = track;
        // @TODO set duration ?
    },

    setPlayerTime: (state, action) => {
      const { payload: { position, timestamp }} = action;
      if(timestamp > state.timestamp) {
        console.log('time is linear');
        state.timestamp = timestamp;
        state.position = position;
      }

    },

    setPlayerTrackUpdate: (state, action) => {
      const { payload: { previousTracks, nextTracks }} = action;
        state.previousTracks = previousTracks;
        state.nextTracks = nextTracks;
        // @TODO clear out position and timestamp?
    },


    // setPlayerConnected: (state, action) => {
    //   state.appConnect = true
    // },

    // setPlayerIsPlaying: (state, action) => {
    //   state.playing = true
    // },
  },
});

export const {
  setInit,
  setPlayerReady,
  // setPlayerConnected,
  // setPlayerIsPlaying,
  setPlayerUpdateReady,
  setPlayerTime,
  setPlayerTrackUpdate
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


export const selectPlayerIsActive = createSelector(
  selectPlayerDomain,
  player => player.isActive
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

export const selectPlayerIsPlaying = createSelector(
  selectPlayerDomain,
  player => player.playing
);

export default playerSlice.reducer;
