import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {useLocation } from "react-router-dom";


// import {
//     setSpofityTokenInfo
// } from '../../features/audioDemo/audioDemoSlice';

import {
  setTokenInfo
} from '../../features/spotify/spotifySlice';

export default function TokenPage () {

    console.log(
        'TokenPage'
    )
    // // there should be an better way to do this...?
    // const tokenAccessSplit = '#access_token=';
    // const tokenTypeSplit = '&token_type=';
    // const tokenExpiresSplit = '&expires_in=';

    // const { hash } = useLocation() || {hash:''};
    // const token = hash.split(tokenAccessSplit)[1].split(tokenTypeSplit)[0];
    // const type = hash.split(tokenTypeSplit)[1].split(tokenExpiresSplit)[0];
    // const expire = hash.split(tokenExpiresSplit)[1];

    // const dispatch = useDispatch();
    // dispatch(setSpofityTokenInfo({token, type, expire}));




    const dispatch = useDispatch();
    const { search } =  useLocation();// || {search:''};
  
    // const playerReady = useSelector(selectPlayerReady);
   
    useEffect(()=> {
          // there should be an better way to do this...?
          // todo use a useMemo?
          const tokenAccessSplit = '?access_token=';
          const tokenRefreshSplit = '&refresh_token=';
   
          const access = search?.split(tokenAccessSplit)[1]?.split(tokenRefreshSplit)[0];
          const refresh = search?.split(tokenRefreshSplit)[1];
          dispatch(setTokenInfo({access, refresh}));
    },[]);

    return (
      <>
      </>
    );
}