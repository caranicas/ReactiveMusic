import { useDispatch } from 'react-redux';
import {
  useLocation
} from "react-router-dom";

import AudioDemo from '../../features/audioDemo/audioDemo';
import styles from '../routes.module.css';

import {
  setSpofityTokenInfo
} from '../../features/audioDemo/audioDemoSlice';


export default function EditorPage () {

    ///let location = useLocation();

        // there should be an better way to do this...?
        const tokenAccessSplit = '#access_token=';
        const tokenTypeSplit = '&token_type=';
        const tokenExpiresSplit = '&expires_in=';
    
        const { hash } = useLocation() || {hash:''};
        console.log('EditorPage hash', hash)
        // const token = hash.split(tokenAccessSplit)[1].split(tokenTypeSplit)[0];
        // const type = hash.split(tokenTypeSplit)[1].split(tokenExpiresSplit)[0];
        // const expire = hash.split(tokenExpiresSplit)[1];
    
        // const dispatch = useDispatch();
        // dispatch(setSpofityTokenInfo({token, type, expire}));
    

    return (
      <div className={styles.page}>
        <AudioDemo/>
      </div>
    );
}
  