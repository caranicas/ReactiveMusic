import React, {useEffect, useCallback} from 'react';
import { useDispatch } from 'react-redux';

import EditorPage from './routes/editor/EditorPage';
import ViewPage from './routes/view/ViewPage';

import CallbackPage from './routes/auth/CallbackPage';

import { Button } from '@material-ui/core';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
      console.log('APP INIT USE EFFECTS')
  },[])

  const doLogin = useCallback(
    () => {
        const client_id = process.env.REACT_APP_CLIENT_ID; // Your client id
        const redirect_uri = process.env.REACT_APP_REDIRECT_URI; // Your redirect uri
        console.log('redirect_uri', redirect_uri);
        const scopes = [
          'streaming',
          'user-library-modify',
          // 'user-read-birthdate',
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

        console.log('doLogin',url);
       // dispatch({});
    },
    []
    //[dispatch]
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
                  
                  <Route exact path="/editor">
                    { EditorPage }
                  </Route>

                  <Route exact path="/view">
                    <ViewPage />
                  </Route>

                  <Route path="/callback">
                    <CallbackPage />
                  </Route>

                </Switch>
            </div>

            <div id="footer">
              <Button  onClick={doLogin}>LOGIN</Button>
              <p>Footer Lorem ipsum</p>
            </div>
        </div>
      </Router>
  );
}

export default App;
