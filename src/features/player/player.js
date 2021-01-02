import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Script from 'react-load-script'


export default function Player() {
    const dispatch = useDispatch();


    useEffect(()=> {
        console.log('PLAYER USE EFFEC')
        window.onSpotifyWebPlaybackSDKReady = async () => {
            console.log('onSpotifyWebPlaybackSDKReady')
            // window.$player = new window.Spotify.Player({
            //   name: 'Kaleidosync',
            //   getOAuthToken: cb => { cb(rootState.spotify.accessToken) } 
            // })
            // await window.$player.connect()
            // dispatch('attachListeners')
            // commit('SET_INITIALIZED', true)
            // resolve()
        }
    },[]);


    const createPlayerScript = useCallback(
        () => {
            console.log('createPlayerScript')
            //return dispatch(setShapeIndexActive(0));
        },
        [dispatch]
    );

    const loadPlayerScript = useCallback(
        () => {
            console.log('loadPlayerScript')
            //return dispatch(setShapeIndexActive(0));
        },
        [dispatch]
    );


    const errorPlayerScript = useCallback(
        () => {
            console.log('errorPlayerScript')
            // return dispatch(setShapeIndexActive(0));
        },
        [dispatch]
    );




  return (
    <div>
        PLAYER
        <Script
            url="https://sdk.scdn.co/spotify-player.js"
            onCreate={createPlayerScript}
            onLoad={loadPlayerScript}
            onError={errorPlayerScript}
        />
    </div>
  );
}
