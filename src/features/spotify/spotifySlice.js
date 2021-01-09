import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import axios from 'axios';


// First, create the thunk
export const fetchAuthId = createAsyncThunk(
    'spotify/fetchAuthId',
    async () => {
        const { data } = await axios.get('/api/auth') // eslint-disable-line
        //const response = await userAPI.fetchById(userId)
        return data;
    }
);

export const asyncUserLogin = createAsyncThunk(
    'spotify/asyncUserLogin',
    async () => {
        const { data } = await axios.get('/api/auth') // eslint-disable-line
        //const response = await userAPI.fetchById(userId)
        return data;
    }
);



// JUST A POC TEST
export const getSpotifySearchResults = createAsyncThunk(
  'spotify/searchResults',
  async (args, { getState }) => {
    const token = selectSpotifyAccessToken(getState());
    console.log(
      'getSpotifySearchResults token', token
    );
    const config = {
      method: 'get',

      url: 'https://api.spotify.com/v1/search?q=artist:guster&type=artist',
      //'https://api.spotify.com/v1/search?q=album:gold%20artist:abba&type=album',
     
      //'https://api.spotify.com/v1/search?q=roadhouse%20blues',
      // 'https://api.spotify.com/v1/search?q=name:guster&type=artist',
      headers: { 'Authorization': `Bearer ${token}` },
    };

    console.log('config', config)
    // json: true
    
    const { data } =  await axios(config);
    return data;
  }
);



//https://api.spotify.com/v1/search

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
    access: null, 
    refresh: null,

    // offically finally logged in
    loggedIn:false,
    search:null
  },

  reducers: {
    setTokenInfo: (state, action) => {
    const{payload: {access, refresh}} = action;
      state.access = access;
      state.refresh = refresh;
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

    [getSpotifySearchResults.fulfilled]: (state, action) => {
      console.log('search fufilled', action);
      state.search =true;
    }

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
    spotify => spotify.access
);

export const selectSpotifyRefreshToken = createSelector(
  selectSpotifyDomain,
  spotify => spotify.refresh
);

export default SpotifySlice.reducer;
