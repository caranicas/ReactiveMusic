import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";

import {
  setTokenInfo
} from '../../features/spotify/spotifySlice';

export default function TokenPage () {

    const dispatch = useDispatch();
    const { search } =  useLocation();// || {search:''};
   
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