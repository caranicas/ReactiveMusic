import React, {useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EditorPage from './routes/editor/EditorPage';
import ViewPage from './routes/view/ViewPage';

import TokenPage from './routes/auth/TokenPage';

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
  
  // selectors
  selectSpotifyAccessToken,
  selectSpotifyLocalAuthed,
  selectSpotifyLocalId,
} from './features/spotify/spotifySlice';

function App() {

  const sucess = useSelector(selectSpotifyLocalAuthed);
  const tokenAccess = useSelector(selectSpotifyAccessToken);
  const localId = useSelector(selectSpotifyLocalId);
  const dispatch = useDispatch();

  // this fires on init, leaving for
  // the time being
  useEffect(() => {
      console.log('APP INIST USE EFFECTS', process.env.REACT_APP_PROJECT_ROOT);
  },[]);

  // when the local id changes there is a new user
  // todo figure out how to pass success as well....
  useEffect(() => {
    if(localId) {
         window.location.href = `${process.env.REACT_APP_PROJECT_ROOT}/api/login?auth_id=${localId}` // eslint-disable-line
    }
  },[0, localId])

  const doLogin = useCallback(
    () => {
        dispatch(fetchAuthId());
    },
    [dispatch]
);

  return (
      <Router>
        <div id="layout">
            <div id="header">
              <Link to='/'>home</Link>
              <Link to='/editor'>Editor</Link>
              <Link to='/view'>View</Link>
            </div>
            <div id="content">
                <Switch>

                  <Route exact path="/">
                    <Button  onClick={doLogin}>LOGIN</Button>
                  </Route>

                  <Route path="/editor">
                     {/* if we have a token go to the editor page, otherwise go back to home page*/}
                     {tokenAccess != null ? < EditorPage /> :  <Redirect to="/" />}
                  </Route>

                  <Route exact path="/view">
                    <ViewPage />
                  </Route>

                  <Route path="/token">
                    {/* use the token page to grab the data and then redirect to the editor*/}
                    <TokenPage />
                    <Redirect to="/editor" />
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
