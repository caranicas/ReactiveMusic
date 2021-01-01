// import  express from 'express';
// import path from 'path'
// todo use imports
const express = require('express');
const path = require('path');
const cors = require('cors');
// todo validate these
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

const app = express();


// todo use process.env
var client_id = '2b4cc6d1505b498b8c4236c954a753e6'; // Your client id
var client_secret = '6a43fd0d4976468a9b7e5892cd25903d'; // Your secret
var redirect_uri = 'http://localhost:3000/callback/'; // Your redirect uri



/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
// todo WHY?
var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

app.use(express.static(path.join(__dirname, 'build')))   
    .use(cors())
    .use(cookieParser());

// todo figure out how to get the routes to read from a single place
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.get('/login', function(req, res) {
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

    
    var state = generateRandomString(16);




    res.cookie(stateKey, state);
    // your application requests authorization
    var scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scopes.join(' '),
        redirect_uri: redirect_uri,
        state: state
      }));
  });

app.get('/editor', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/view', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/callback', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(3000);