import {
    useLocation
} from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';



export default function CallbackPage () {

    const tokenAccessSplit = '#access_token='
    const tokenTypeSplit = '&token_type='
    const tokenExpiresSplit = '&expires_in='
    const { hash } = useLocation();
    console.log(
        'useLocation',useLocation() 
    );
    console.log(
        'hash', hash
    );


    const dispatch = useDispatch()

    return (
      <div>
        Callback Page
      </div>
    );
}
  