import {
    useLocation
} from "react-router-dom";

import { useDispatch } from 'react-redux';

import {
    setSpofityTokenInfo
} from '../../features/audioDemo/audioDemoSlice';



export default function CallbackPage () {

    console.log(
        'CallbackPage'
    )
    // there should be an better way to do this...?
    const tokenAccessSplit = '#access_token=';
    const tokenTypeSplit = '&token_type=';
    const tokenExpiresSplit = '&expires_in=';

    const { hash } = useLocation() || {hash:''};
    const token = hash.split(tokenAccessSplit)[1].split(tokenTypeSplit)[0];
    const type = hash.split(tokenTypeSplit)[1].split(tokenExpiresSplit)[0];
    const expire = hash.split(tokenExpiresSplit)[1];

    const dispatch = useDispatch();
    dispatch(setSpofityTokenInfo({token, type, expire}));

    return (
      <div>
        Callback Page
      </div>
    );
}
  