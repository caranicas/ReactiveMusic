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
  
    return (
      <div className={styles.page}>
        {/* <ConnectStatus/> */}
        <AudioDemo/>
      </div>
    );
}