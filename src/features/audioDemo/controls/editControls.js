import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@material-ui/core';

import {ToggleButtonGroup, ToggleButton} from '@material-ui/lab'
import { 
    INSPECT, MAKE_SQUARE, MAKE_CIRCLE,
    addBoxToScene, addSphereToScene, setEditAction,
    selectCurrentAction
} from '../audioDemoSlice';

export default function EditControls () {

    const dispatch = useDispatch();
    const buttonValue = useSelector(selectCurrentAction);

    const createBox = useCallback(
        () => {
            const pos = {x:0,y:0,z:0};
            return dispatch(addBoxToScene({pos}))
        },
        [dispatch]
    );

    const createSphere = useCallback(
        () => {
            const pos = {x:0,y:0,z:0};
            return dispatch(addSphereToScene({pos}))
        },
        [dispatch]
    );

    const handleEditAction = (event, newAction) => {
        dispatch(setEditAction(newAction))
    };

    return (
        <div style={{ display:'flex', padding: '5px', backgroundColor:'rgb(200,200,200)' }}>
            <ToggleButtonGroup value={buttonValue} onChange={handleEditAction}  exclusive aria-label="text formatting">
                <ToggleButton value={INSPECT}> Inspect </ToggleButton> 
                <ToggleButton value={MAKE_SQUARE} onDoubleClick={createBox}>Add Cube</ToggleButton> 
                <ToggleButton value={MAKE_CIRCLE} onDoubleClick={createSphere} color="primary">Add sphere</ToggleButton> 
            </ToggleButtonGroup>
        </div>
    );
}
  