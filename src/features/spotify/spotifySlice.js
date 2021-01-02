import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

export const SpotifySlice = createSlice({
  name: 'spotify',
  initialState: {
    token: null, 
    type: null, 
    expire: null,
  },
  reducers: {
    setTokenInfo: (state, action) => {
    const{payload: {token, type, expire}} = action
      state.spotify = {
        token, type, expire
      }
    },
  },
});

export const { setTokenInfo } = SpotifySlice.actions;
export const selectSpotifyDomain = state => state.spotify;

export const selectSpotifyAccessToken = createSelector(
    selectSpotifyDomain,
    spotify => spotify.token
  );

export default SpotifySlice.reducer;
