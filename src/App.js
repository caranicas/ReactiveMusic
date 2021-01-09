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
                    {/* <Link to='/login'>login</Link> */}
                    <Button  onClick={doLogin}>LOGIN</Button>
                  </Route>

                  <Route path="/editor">
                    < EditorPage />
                  </Route>

                  {/* <Route path="/editor/catch">
                    < EditorPage />
                  </Route> */}

                  <Route exact path="/view">
                    <ViewPage />
                  </Route>

                  {/* <Route path="/callback">
                    <CallbackPage />
                  </Route> */}

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
