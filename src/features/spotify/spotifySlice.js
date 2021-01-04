import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import axios from 'axios';


// First, create the thunk
export const fetchAuthId = createAsyncThunk(
    'spotify/fetchAuthId',
    async () => {
        console.log('fetchAuthId TOP')
        const { data } = await axios.get('/api/auth') // eslint-disable-line
        //const response = await userAPI.fetchById(userId)
        return data;
    }
);

export const asyncUserLogin = createAsyncThunk(
    'spotify/asyncUserLogin',
    async () => {
        console.log('fetchAuthId TOP')
        const { data } = await axios.get('/api/auth') // eslint-disable-line
        //const response = await userAPI.fetchById(userId)
        return data;
    }
);

export const SpotifySlice = createSlice({
  name: 'spotify',
  initialState: {
    // kicking off the whole thing
    loggingIn:false,
    
    //an inital server response
    // not entirely sure of it's necessity
    localAuthed:false,
    authId:null,
    
    // spotify server values
    token: null, 
    type: null, 
    expire: null,

    // offically finally logged in
    loggedIn:false,
  },

  reducers: {
    setTokenInfo: (state, action) => {
    const{payload: {token, type, expire}} = action;
      state.spotify = {
        token, type, expire
      };
    },
  },
  extraReducers: {

    // Add reducers for additional action types here, and handle loading state as needed
    [fetchAuthId.pending]: (state, action) => {
        state.loggingIn = true;
    },

    // Add reducers for additional action types here, and handle loading state as needed
    [fetchAuthId.fulfilled]: (state, action) => {
        const { payload: { auth_id, success }} = action;
        state.localAuthed = success;
        state.authId = auth_id;
    }, 

    [asyncUserLogin.pending]: (state, action) => {
    },

    [asyncUserLogin.fulfilled]: (state, action) => {
        state.loggingIn = true;
    },

  }
});

export const {setStartLoginProcess, setTokenInfo } = SpotifySlice.actions;
export const selectSpotifyDomain = state => state.spotify;


export const selectSpotifyLocalId = createSelector(
    selectSpotifyDomain,
    spotify => spotify.authId
);

export const selectSpotifyLocalAuthed = createSelector(
    selectSpotifyDomain,
    spotify => spotify.localAuthed
);

export const selectSpotifyAccessToken = createSelector(
    selectSpotifyDomain,
    spotify => spotify.token
);

export default SpotifySlice.reducer;
