import { useCallback, useState} from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@material-ui/core';

import {ToggleButtonGroup, ToggleButton} from '@material-ui/lab'

//ToggleButtonGroup,
import { INSPECT, MAKE_SQUARE, MAKE_CIRCLE, addBoxToScene, setEditAction} from '../audioDemoSlice';

export default function EditControls () {


    const formats = ['cube', 'sphere'];
    const [editAction, setLocalAction]  = useState(formats[0]);
    const dispatch = useDispatch()

    const createBox = useCallback(
        () => {
            const pos = {x:0,y:0,z:0};
            return dispatch(addBoxToScene({pos}))
        },
        [dispatch]
    );

    const setCreateCube = useCallback(
        () => {
            return dispatch(setEditAction(MAKE_SQUARE))
        },
        [dispatch]
    );

    const handleEditAction = (event, newAction) => {
        console.log('handleEditAction',newAction)
        setLocalAction(newAction);
      };
    

    return (
        <div>
            <ToggleButtonGroup value={editAction}  onChange={handleEditAction}  exclusive aria-label="text formatting">
                <ToggleButton value='cube' onDoubleClick={createBox} onClick={setCreateCube}>Add Cube</ToggleButton> 
                <ToggleButton value='sphere' color="primary">Add sphere</ToggleButton> 
            </ToggleButtonGroup>
            {/* <Button color="primary" onDoubleClick={createBox} onClick={setCreateCube}>Add cube</Button>
            <ToggleButton color="primary">Add sphere</ToggleButton> 
            <Button color="primary">Inspect Shape</Button> */}
        </div>
    );
}
  