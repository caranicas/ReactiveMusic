import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useLocation,
  Route
} from "react-router-dom";

import AudioDemo from '../../features/audioDemo/audioDemo';
import styles from '../routes.module.css';

import {
  setTokenInfo
} from '../../features/spotify/spotifySlice';


import {
  //selector
  selectPlayerWaitingToConnect,

} from '../../features/player/playerSlice';

function ConnectStatus() {
  const playerReady = useSelector(selectPlayerWaitingToConnect);

  console.log('ConnectStatus', playerReady)

  if(playerReady){
    return (
      <></>
    );
  }
  else {
    return (
      <div className="overlay">
          SWITCH TO SPOTIFY AND CONNECT TO MUSIC VIS
      </div>
    );
  }
};


export default function EditorPage () {


  // const dispatch = useDispatch();
  // const { search } =  useLocation();// || {search:''};

  // // const playerReady = useSelector(selectPlayerReady);
 
  // useEffect(()=> {
  //       // there should be an better way to do this...?
  //       // todo use a useMemo?
  //       const tokenAccessSplit = '?access_token=';
  //       const tokenRefreshSplit = '&refresh_token=';
 
  //       const access = search?.split(tokenAccessSplit)[1]?.split(tokenRefreshSplit)[0];
  //       const refresh = search?.split(tokenRefreshSplit)[1];
    
  //       dispatch(setTokenInfo({access, refresh}));
    
  // },[]);

    return (
      <div className={styles.page}>
        {/* <ConnectStatus/> */}
        <AudioDemo/>
      </div>
    );
}