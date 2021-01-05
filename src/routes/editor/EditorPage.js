import { useDispatch } from 'react-redux';
import {
  useLocation
} from "react-router-dom";

import AudioDemo from '../../features/audioDemo/audioDemo';
import styles from '../routes.module.css';

import {
  setTokenInfo
} from '../../features/spotify/spotifySlice';


export default function EditorPage () {

        const dispatch = useDispatch();

        // there should be an better way to do this...?
        // todo use a useMemo?
        const tokenAccessSplit = '?access_token=';
        const tokenRefreshSplit = '&refresh_token=';
        const { search } =  useLocation();// || {search:''};
        const access = search?.split(tokenAccessSplit)[1]?.split(tokenRefreshSplit)[0];
        const refresh = search?.split(tokenRefreshSplit)[1];
    
        dispatch(setTokenInfo({access, refresh}));
    

    return (
      <div className={styles.page}>
        <AudioDemo/>
      </div>
    );
}
  