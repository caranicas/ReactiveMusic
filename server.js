// @references https://github.com/zachwinter/kaleidosync/blob/046af60adff46013117a6bcabdc5cc8406b2ccce/server/index.js

// import  express from 'express';
// import path from 'path'
// todo use imports
const express = require('express');
const request = require('request')
const path = require('path');
const cors = require('cors');
// todo validate these
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

const app = express();

// todo use process.env
var state_key = 'spotify_auth_state';
var client_id = '2b4cc6d1505b498b8c4236c954a753e6'; // Your client id
var client_secret = '6a43fd0d4976468a9b7e5892cd25903d'; // Your secret
var redirect_uri = 'http://localhost:3000/callback/'; // Your redirect uri


app.use(express.static(path.join(__dirname, 'build')))
    .use(cors())
    .use(cookieParser());
    
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Methods', 'GET')
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//     next()
//   })

// PAGE Routes
// todo figure out how to get the routes to read from a single place
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/editor/', function (req, res) {
  console.log("EDITOR ROUTE")
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.get('/token', function (req, res) {
  console.log("TOKEN ROUTE")
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/view', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.get('/callback', function (req, res) {
 
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[state_key] : null;
    if (code === null) return res.json({ error: true, message: 'No login code present.' });

    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    }


    else {
      // figurre this out.
      res.clearCookie(state_key);
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };



      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
  
          var access_token = body.access_token,
              refresh_token = body.refresh_token;
  
          // var options = {
          //   url: 'https://api.spotify.com/v1/me',
          //   headers: { 'Authorization': 'Bearer ' + access_token },
          //   json: true
          // };
  
          // use the access token to access the Spotify Web API
          // request.get(options, function(error, response, body) {
          //   console.log(body);
          // });
  
          // we can also pass the token to the browser to make requests from there
          res.redirect('/token?' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            }));
        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      });

    }


});


app.get('/api/auth', (req, res) => {
  res.json({
    success: true,
    auth_id: Math.random().toString(36).slice(5, 11).toUpperCase()
  })
});


// "api"
app.get('/api/login', function(req, res) {
  const auth_id = req.query.auth_id
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

  const query = querystring.stringify({
    response_type: 'code',
    client_id: client_id,
    scope: scopes.join(' '),
    redirect_uri: redirect_uri,
    state:auth_id,
  });

  res.cookie(state_key, auth_id);
  res.redirect('https://accounts.spotify.com/authorize?' + query);

});
console.log('LISTENING');
app.listen(3000);