import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Script from 'react-load-script';

import {
    useAnimationFrame
} from '../../app/customHooks/animationFrame';

import {
    selectSpotifyAccessToken,
    selectSpotifyRefreshToken
} from '../spotify/spotifySlice';



import {
    setSDKReady,
    selectPlayerReady,
    setPlayerInit,
} from './playerSlice';

export default function Player() {
    const dispatch = useDispatch();
    const tokenAccess = useSelector(selectSpotifyAccessToken);
    const tokenRefresh = useSelector(selectSpotifyRefreshToken);
    const playerReady = useSelector(selectPlayerReady);

    // on first load
    useEffect(()=> {
        window.onSpotifyWebPlaybackSDKReady = () => {
            console.log('onSpotifyWebPlaybackSDKReady')
            dispatch(setSDKReady());
        };
    },[]);


    const playerListeners = () => {
        console.log('SET LISTENERS')
        window.$player.addListener('player_state_changed', async (o) => {
            console.log('player_state_changed', o)
        });
    }


    // create the player with our token
    useEffect(()=> {
        async function createPlayer() {
            window.$player = new window.Spotify.Player({
                name: 'Music Vis',
                getOAuthToken: cb => { cb(tokenAccess) }
            });

            playerListeners();
            await window.$player.connect();
            dispatch(setPlayerInit());
            return {};
            //return resolve();
        }
        if(playerReady) {
            createPlayer();
        }

    },[tokenAccess, playerReady]);

    // useAnimationFrame(deltaTime => {
    //     async function checkState() {
    //         //const _state = window.$player.getCurrentState();
    //         const _state = await window.$player.getCurrentState();
    //         if (!_state) {
    //             // console.log('no state return')
    //             return;
    //         } 

    //         console.log(
    //             '_state', _state
    //         );
    //         debugger;
    //     }


    //     if (!window.$player) return;

    //     checkState();
      

     
    //    // debugger;
    //     //console.log('USE ANIMATION FRAME');
    // });

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
