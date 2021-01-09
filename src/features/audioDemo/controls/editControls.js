import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@material-ui/core';

import {ToggleButtonGroup, ToggleButton} from '@material-ui/lab'
import { 
    INSPECT, MAKE_SQUARE, MAKE_CIRCLE,
    addBoxToScene, addSphereToScene, setEditAction, setShapeIndexActive,
   selectActiveShapeId,  selectCurrentAction
} from '../audioDemoSlice';

import {
    getSpotifySearchResults
} from '../../spotify/spotifySlice';


export default function EditControls () {

    const dispatch = useDispatch();
    const buttonValue = useSelector(selectCurrentAction);
    const idValu = useSelector(selectActiveShapeId);


    const updateSelectedIndex = useCallback(
        () => {
            return dispatch(setShapeIndexActive(0));
        },
        [dispatch]
    );

    const createBox = useCallback(
        () => {
            const pos = {x:0,y:0,z:0};
            return dispatch(addBoxToScene({pos}));
        },
        [dispatch]
    );

    const createSphere = useCallback(
        () => {
            const pos = {x:0,y:0,z:0};
            return dispatch(addSphereToScene({pos}));
        },
        [dispatch]
    );

    const searchTest = useCallback(
        () => {
            console.log('callback dispatch getSpotifySearchResults ')
            return dispatch(getSpotifySearchResults('foobar'));
        },
        [dispatch]
    );

    const handleEditAction = (event, newAction) => {
        dispatch(setEditAction(newAction))
    };

    return (
        <div style={{ display:'flex', padding: '5px', backgroundColor:'rgb(200,200,200)' }}>
            <ToggleButtonGroup value={buttonValue} onChange={handleEditAction}  exclusive aria-label="text formatting">
                <ToggleButton value={INSPECT}  onDoubleClick={updateSelectedIndex}> Inspect </ToggleButton> 
                <ToggleButton value={MAKE_SQUARE} onDoubleClick={createBox}>Add Cube</ToggleButton> 
                <ToggleButton value={MAKE_CIRCLE} onDoubleClick={createSphere} color="primary">Add sphere</ToggleButton> 
            </ToggleButtonGroup>

            <Button onClick={searchTest}>SEARCH TEST</Button>
        </div>
    );
}
  