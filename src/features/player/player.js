import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Script from 'react-load-script';

import {
    // useAnimationFrame,
    reUseAnimationFrame
} from '../../app/customHooks/animationFrame';
import SpotifyPlayer from 'react-spotify-web-playback';
import {
    selectSpotifyAccessToken,
    selectSpotifyRefreshToken
} from '../spotify/spotifySlice';

import {
    // actions
    setInit,
    setPlayerReady,
    // setPlayerConnected,
    // setPlayerIsPlaying,
    setPlayerUpdateReady,
    setPlayerTrackUpdate,
    setPlayerTime,

    //selector
    selectPlayerReady,
    selectPlayerIsActive,
    selectPlayerIsPlaying

} from './playerSlice';

export default function Player() {
    const dispatch = useDispatch();
    const tokenAccess = useSelector(selectSpotifyAccessToken);
    const tokenRefresh = useSelector(selectSpotifyRefreshToken);
    const playerPlaying = useSelector(selectPlayerIsPlaying);
    const playerRef = useRef();


    reUseAnimationFrame( (deltaTime) => {
        if (!playerPlaying) return;
        // create an async function to await inside of
        // https://medium.com/javascript-in-plain-english/how-to-use-async-function-in-react-hook-useeffect-typescript-js-6204a788a435
        // @TODO turn into IIFE
        async function checkState() {
            const state = await playerRef.current.player.getCurrentState();
            console.log('_state', state);
            const { position, timestamp } = state;
            dispatch(setPlayerTime({position, timestamp}));
        };
        checkState();
    },[playerPlaying]);

    const playerCallbackHandle = useCallback(
        (state) => {
            const { type, status } = state;
            if(type == 'status_update') {

                if(status === "INITIALIZING") {
                    dispatch(setInit());
                }

                else if(status === "READY") {
                    const { devices, currentDeviceId } = state;
                    dispatch(setPlayerReady({devices, currentDeviceId}))
                }

                else {
                    console.log('STATUS', status);
                    alert(
                        'NEW STATUS'
                    )
                }
            }
            else if (type == 'player_update') {
                const { isActive, isPlaying, track } = state;
                if(status === "READY") {
                    dispatch(setPlayerUpdateReady({isActive, isPlaying, track}));
                }

                else {
                    console.log('STATUS', status);
                    alert(
                        'NEW STATUS'
                    )
                }
            }
            else if (type == 'track_update') {
                const { nextTracks, previousTracks } = state;
                if(status === "READY") {
                    dispatch(setPlayerTrackUpdate({nextTracks, previousTracks}));
                }
            }
            else {
                console.log('TYPE', type);
                alert(
                    'NEW TYPE'
                )
            }
        },
        [dispatch]
    );

    return (
        <SpotifyPlayer
            ref={playerRef}
            callback={playerCallbackHandle}
            name='Music Vis'
            token={tokenAccess}
            syncExternalDevice
            uris={['spotify:artist:34XlPCFfB4vT7P1ekWq9Jc']}
        />
    );
}
