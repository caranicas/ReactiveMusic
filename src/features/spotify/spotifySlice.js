import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import axios from 'axios';
import { ease } from '../../app/util/easing'

import {
  selectPlayerAudioPositionMS
} from '../player/playerSlice';

// First, create the thunk
export const fetchAuthId = createAsyncThunk(
    'spotify/fetchAuthId',
    async () => {
        const { data } = await axios.get('/api/auth') // eslint-disable-line
        return data;
    }
);

export const asyncUserLogin = createAsyncThunk(
    'spotify/asyncUserLogin',
    async () => {
        const { data } = await axios.get('/api/auth') // eslint-disable-line
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
      headers: { 'Authorization': `Bearer ${token}` },
    };

    console.log('config', config)
    // json: true
    
    const { data } =  await axios(config);
    return data;
  }
);

export const getSpotifyAudioResults = createAsyncThunk(
  'spotify/audioResults',
  async (args, { getState }) => {
    const token = selectSpotifyAccessToken(getState());
    console.log(
      'getSpotifySearchResults token', token
    );
    const config = {
      method: 'get',
      url: 'https://api.spotify.com/v1/audio-analysis/14j4diRlUSWvbq5t0rgR6b',
      headers: { 'Authorization': `Bearer ${token}` },
    };

    console.log('audioResults config', config)
    // json: true
    
    const { data } =  await axios(config);
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
    access: null, 
    refresh: null,

    // offically finally logged in
    loggedIn:false,
    search:null,
    isLoadingAnalysis:false,
    trackAnalysis:{
      //meta
      //track
      //bar
      //beats
      //sections
      //segments
      //tatums
    },
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
      state.search =true;
    },

    [getSpotifyAudioResults.pending]: (state, action) =>{
      state.isLoadingAnalysis = true;
    },

    [getSpotifyAudioResults.fulfilled]: (state, action) => {
      const { payload } = action;
      state.isLoadingAnalysis = false;
      state.trackAnalysis = payload;
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


// trackAnalysis:{
//   //meta
//   //track
//   //bar
//   //beats
//   //sections
//   //segments
//   //tatums
// },


const infoIndex = (time) => (info) => {
  return time > info?.start && time < info?.start + info?.duration
};

export const selectAllBarInfo = createSelector(
  selectSpotifyDomain,
  spotify =>{
    return spotify.trackAnalysis?.bars;
  }
);

// @ TODO to super functional
// export const selectAnalysisInfoForTimeStamp = (type, time)
export const selectBarInfoForTimeStamp = (time) => createSelector(
  selectAllBarInfo,
  (bars) => {
    // quick out
    if(!bars) return [];
    const index = bars.findIndex(infoIndex(time));
    // current bar
    let info = [bars[index]];
    // conditional next bar
    (bars.length > (index+1)) && info.push(bars[index+1]);
    return info;
  }
);


export const selectCurrentBarInfo = createSelector(
  selectPlayerAudioPositionMS,
  selectAllBarInfo,
  (position, bars) => {
    // quick out
    if(!bars) return {};
    const index = bars.findIndex(infoIndex(position));
    // current bar
    //let info = [bars[index]];
    // conditional next bar
    // (bars.length > (index+1)) && info.push(bars[index+1]);
    return bars[index];//info[0];
  }
);


export const selectCurrentBarElapsed = createSelector(
  selectCurrentBarInfo,
  selectPlayerAudioPositionMS,
  (bar, curTime) => {
    const { start } = bar || {};
    if(!start) {
      return 1;
    }
    const elapsed  = curTime - start;
    return elapsed;
  }
);


export const selectCurrentBarProgress = createSelector(
  selectCurrentBarInfo,
  selectCurrentBarElapsed,
  (bar, elapsed) => {
    const { duration } = bar || {};
    if(!duration) {
      return 1;
    }
    // ease?
    const progress = elapsed / duration;
    return progress;
  }
);


const selectAllBeatInfo = createSelector(
  selectSpotifyDomain,
  spotify => spotify.trackAnalysis?.beats
);

export const selectBeatInfoForTimeStamp = (time) => createSelector(
  selectAllBeatInfo,
  (beats) => {
    // quick out
    if(!beats) return [];
    const index = beats.findIndex(infoIndex(time));
    // current beat
    let info = [beats[index]];
    // conditional next beat
    (beats.length > (index+1)) && info.push(beats[index+1]);
    return info;
  }
);

export const selectCurrentBeatInfo = createSelector(
  selectPlayerAudioPositionMS,
  selectAllBeatInfo,
  (position, beats) => {
    // quick out
    if(!beats) return {};
    const index = beats.findIndex(infoIndex(position));
    // current bar
    //let info = [beats[index]];
    // conditional next bar
    // (beats.length > (index+1)) && info.push(beats[index+1]);
    return beats[index];//info[0];
  }
);


export const selectCurrentBeatElapsed = createSelector(
  selectCurrentBeatInfo,
  selectPlayerAudioPositionMS,
  (beat, curTime) => {
    const { start } = beat || {};
    if(!start) {
      return 1;
    }
    const elapsed  = curTime - start;
    return elapsed;
  }
);


export const selectCurrentBeatProgress = createSelector(
  selectCurrentBeatInfo,
  selectCurrentBeatElapsed,
  (beat, elapsed) => {
    const { duration } = beat || {};
    if(!duration) {
      return 1;
    }
    // ease?
    const progress = elapsed / duration;
    return progress;
  }
);

const selectAllSectionInfo = createSelector(
  selectSpotifyDomain,
  spotify => spotify.trackAnalysis?.sections
);

export const selectSectionInfoForTimeStamp = (time) => createSelector(
  selectAllSectionInfo,
  (sections) => {
    // quick out
    if(!sections) return [];
    const index = sections.findIndex(infoIndex(time));
    // current section
    let info = [sections[index]];
    // conditional next section
    (sections.length > (index+1)) && info.push(sections[index+1]);
    return info;
  }
);

const selectAllSegmentInfo = createSelector(
  selectSpotifyDomain,
  spotify => spotify.trackAnalysis?.segments
);

export const selectSegmentInfoForTimeStamp = (time) => createSelector(
  selectAllSegmentInfo,
  (segments) => {
    // quick out
    if(!segments) return [];
    const index = segments.findIndex(infoIndex(time));
    // current segment
    let info = [segments[index]];
    // conditional next segment
    (segments.length > (index+1)) && info.push(segments[index+1]);
    return info;
  }
);

const selectAllTatumInfo = createSelector(
  selectSpotifyDomain,
  spotify => spotify.trackAnalysis?.tatums
);

export const selectTatumInfoForTimeStamp = (time) => createSelector(
  selectAllTatumInfo,
  (tatums) => {
    // quick out
    if(!tatums) return [];
    const index = tatums.findIndex(infoIndex(time));
    // current tatum
    let info = [tatums[index]];
    // conditional next tatum
    (tatums.length > (index+1)) && info.push(tatums[index+1]);
    return info;
  }
);


export const selectCurrentTatumInfo = createSelector(
  selectPlayerAudioPositionMS,
  selectAllTatumInfo,
  (position, tatum) => {
    // quick out
    if(!tatum) return {};
    const index = tatum.findIndex(infoIndex(position));
    return tatum[index];//info[0];
  }
);


export const selectCurrentTatumElapsed = createSelector(
  selectCurrentTatumInfo,
  selectPlayerAudioPositionMS,
  (tatum, curTime) => {
    const { start } = tatum || {};
    if(!start) {
      return 1;
    }
    const elapsed  = curTime - start;
    return elapsed;
  }
);


export const selectCurrentTatumProgress = createSelector(
  selectCurrentTatumInfo,
  selectCurrentTatumElapsed,
  (tatum, elapsed) => {
    const { duration } = tatum || {};
    if(!duration) {
      return 1;
    }
    // ease?
    const progress = elapsed / duration;
    return progress;
  }
);
  

// @TODO combine all the above with the get timestamp selector
// export const selectCurrentAnalysis = createSelector(
// );

export default SpotifySlice.reducer;
