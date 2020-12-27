import React from 'react';

import EditorPage from './routes/editor/EditorPage';
import ViewPage from './routes/view/ViewPage';

import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
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
                    { ViewPage }
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
