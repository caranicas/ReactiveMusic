import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Script from 'react-load-script';

import {
    useAnimationFrame
} from '../../app/customHooks/animationFrame';
import SpotifyPlayer from 'react-spotify-web-playback';
import {
    selectSpotifyAccessToken,
    selectSpotifyRefreshToken
} from '../spotify/spotifySlice';

import {
    // actions
    setSDKReady,
    setPlayerConnected,
    setPlayerPause,

    //selector
    selectPlayerReady,

} from './playerSlice';

export default function Player() {
    const dispatch = useDispatch();
    const tokenAccess = useSelector(selectSpotifyAccessToken);
    const tokenRefresh = useSelector(selectSpotifyRefreshToken);
    const playerReady = useSelector(selectPlayerReady);

    // on first load
    // useEffect(()=> {
    //     window.onSpotifyWebPlaybackSDKReady = () => {
    //         dispatch(setSDKReady());
    //     };
    // },[]);


    // const playerListeners = () => {
    //     // window.$player.addListener('player_state_changed', async (o) => {
    //     //     console.log('player_state_changed', o)
    //     // });
    // };

    // create the player with our token
    // useEffect(()=> {
    //     async function createPlayer() {
    //         // window.$player = new window.Spotify.Player({
    //         //     name: 'Music Vis',
    //         //     getOAuthToken: cb => { cb(tokenAccess) }
    //         // });

    //         playerListeners();
    //         // await window.$player.connect();
    //         // dispatch(setPlayerConnected());
    //         // return {};
    //         //return resolve();
    //     }
    //     if(playerReady) {
    //         createPlayer();
    //     }

    // },[tokenAccess, playerReady]);

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


    //     if (!playerReady) return;

    //     checkState();



    //    // debugger;
    //     //console.log('USE ANIMATION FRAME');
    // });



    // @TODO what do i want to do with these? 
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

    const playerCallbackHandle = useCallback(
        (state) => {
            console.log('playerCallbackHandle', state);
        },
        [dispatch]
    );


    console.log('tokenAccess', tokenAccess)


    if(tokenAccess) {
        console.log('RENDER PLAYER PRIME')
        return (
            <>
            <SpotifyPlayer
                callback={playerCallbackHandle}
                name='Music Vis'
                token={tokenAccess}
                uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
            />
            </>
        );
    }
    else {
        return (
            <div>
                PLAYER LOADING {tokenAccess}
            </div>
        );
    }
    //}
    // return (
    //     <div>
    //         PLAYER
    //         {/* <Script
    //             url="https://sdk.scdn.co/spotify-player.js"
    //             onCreate={createPlayerScript}
    //             onLoad={loadPlayerScript}
    //             onError={errorPlayerScript}
    //         /> */}

    //         <SpotifyPlayer
    //             callback={playerCallbackHandle}
    //             name='Music Vis'
    //             token={tokenAccess}
    //             uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
    //         />
    //     </div>
    // );
}
