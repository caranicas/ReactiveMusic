import React, {useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EditorPage from './routes/editor/EditorPage';
import ViewPage from './routes/view/ViewPage';

import CallbackPage from './routes/auth/CallbackPage';

import { Button } from '@material-ui/core';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation
} from "react-router-dom";

import {
  // actions
  fetchAuthId,
  asyncUserLogin,
  // selectors
  selectSpotifyLocalAuthed,
  selectSpotifyLocalId,
} from './features/spotify/spotifySlice';

function App() {

  const sucess = useSelector(selectSpotifyLocalAuthed);
  const localId = useSelector(selectSpotifyLocalId);
  // const location = useLocation();
  const dispatch = useDispatch();

  // this fires on init, leaving for
  // the time being
  useEffect(() => {
      console.log('APP INIST USE EFFECTS', process.env.REACT_APP_PROJECT_ROOT);
  },[]);

  // when the local id changes there is a new user
  useEffect(() => {
    if(localId) {
        // console.log(
        //   'location',location
        // )
     // dispatch(asyncUserLogin(localId));
         window.location.href = `${process.env.REACT_APP_PROJECT_ROOT}/api/login?auth_id=${localId}` // eslint-disable-line
    }
  },[sucess, localId])

  const doLogin = useCallback(
    () => {
        console.log('TRY TO FETCH');
        dispatch(fetchAuthId());
        console.log('POST FETCH WAITS?');

      /*
        const client_id = process.env.REACT_APP_CLIENT_ID; // Your client id
        const redirect_uri = process.env.REACT_APP_REDIRECT_URI; // Your redirect uri
        console.log('redirect_uri', redirect_uri);
        const scopes = [
          'streaming',
          'user-library-modify',
          'user-read-email',
          'user-read-private',
          'user-read-playback-position',
          'user-read-playback-state',
          'user-modify-playback-state',
          'user-read-currently-playing',
          'user-library-read'
        ];


      //  ["streaming", "user-read-birthdate", "user-read-email", "user-read-private"]
       // `http://localhost:3000/calllback/`; // Your redirect uri
  
        let url = 'https://accounts.spotify.com/authorize?response_type=token';
        url += `&client_id=${encodeURIComponent(client_id)}`;
        url += `&redirect_uri=${encodeURIComponent(redirect_uri)}`;
        url += `&scope=${encodeURIComponent(scopes.join(' '))}`;

        window.location.href = url;
        */
    },
    []
);

  return (
      <Router>
        <div id="layout">
            <div id="header">
              <Link to='/editor'>Editor</Link>
              <Link to='/view'>View</Link>
            </div>
            <div id="content">
                <Switch>

                  <Route exact path="/">

                    {/* <Link to='/login'>login</Link> */}
                    <Button  onClick={doLogin}>LOGIN</Button>
                  </Route>

                  <Route path="/editor">
                    { EditorPage }
                  </Route>

                  <Route exact path="/view">
                    <ViewPage />
                  </Route>

                  <Route path="/callback">
                    <CallbackPage />
                    {/* <Redirect to="/editor" /> */}
                  </Route>

                </Switch>
            </div>

            <div id="footer">
              <p>Footer Lorem ipsum</p>
            </div>
        </div>
      </Router>
  );
}

export default App;
