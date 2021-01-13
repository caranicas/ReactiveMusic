import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Script from 'react-load-script';

import useInterpolation from 'use-interpolation';
import useAnimationFrame from 'use-animation-frame';



import SpotifyPlayer from 'react-spotify-web-playback';
import {
    selectSpotifyAccessToken,
    selectSpotifyRefreshToken,
    selectCurrentBarInfo,
    selectAllBarInfo,
    selectCurrentBarElapsed,
    selectCurrentBarProgress
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
    selectPlayerIsPlaying,
    selectPlayerURIs

} from './playerSlice';

export default function Player() {
    const dispatch = useDispatch();
    const tokenAccess = useSelector(selectSpotifyAccessToken);
    const tokenRefresh = useSelector(selectSpotifyRefreshToken);
    const playerPlaying = useSelector(selectPlayerIsPlaying);
    const uriList = useSelector(selectPlayerURIs);
    // const barInfo = useSelector(selectCurrentBarProgress);
    const playerRef = useRef();

    // const [myTime, setTime] = useState(0);
    const [fps, setFps] = useInterpolation(1000);

    useAnimationFrame(({delta, time})=> {
        if (!playerPlaying) return;
        // create an async function to await inside of
        // https://medium.com/javascript-in-plain-english/how-to-use-async-function-in-react-hook-useeffect-typescript-js-6204a788a435
        // @TODO turn into IIFE
        async function checkState() {
            const state = await playerRef.current.player.getCurrentState();
            const { position, timestamp } = state;
            dispatch(setPlayerTime({position, timestamp}));
        };
        checkState();
    },[playerPlaying]);


        // useEffect(()=> {
        //     console.log('BAR PROG CHANGE', barInfo)
        // }, [barInfo]); 

//     const determineActiveIntervals = (trackProgressMs) => {
// //        if (!state.trackAnalysis) return 
    
//         const determineInterval = (analysis) => {
//           for (let i = 0; i < analysis.length; i++) {
//             if (i === (analysis.length - 1)) return i
//             if (analysis[i].start < trackProgressMs && trackProgressMs < analysis[i + 1].start) return i
//           }
//         }
//         console.log('INFO LEN', barInfo.length);
//         const barIndex = determineInterval(barInfo)
//         console.log('barIndex');
//         // const active = state.intervalTypes.reduce((acc, type) => {
//         //   const index = determineInterval(type)
//         //   const interval = { ...state.trackAnalysis[type][index], index }
//         //   const { start, duration } = interval
//         //   const elapsed = trackProgressMs - start
//         //   interval.elapsed = elapsed
//         //   interval.progress = elapsed / duration
//         //   acc[type] = interval
//         //   return acc
//         // }, {})
        
//         //window.__KALEIDOSYNC_LOOP__.activeIntervals = active
//         // commit('SET_ACTIVE_INTERVALS', active)
//     };

    const playerCallbackHandle = useCallback(
        (state) => {
            const { type, status } = state;
            console.log('playerCallbackHandle', state);
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
            else if (type == 'progress_update') {
                console.log('progress_update STATE', state);
                alert(
                    'progress_update'
                );
            }
            else if(type == 'device_update') {
                console.log('device_update STATE', state);
                alert(
                    'device_update'
                );
            } 
            else {
                console.log('NEW TYPE STATE', state);
                alert(
                    'NEW TYPE'
                )
            }
        },
        [dispatch]
    );

    return (
        <div>
        {/* uris={uriList} */}
        {/* <p>FPSS {fps}</p> */}
        <SpotifyPlayer
            ref={playerRef}
            callback={playerCallbackHandle}
            name='Music Vis'
            token={tokenAccess}
            uris={uriList}

        />
        </div>
    );
}
