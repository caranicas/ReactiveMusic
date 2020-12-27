import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@material-ui/core';
import { addBoxToScene } from '../audioDemoSlice';

export default function EditControls () {

    const dispatch = useDispatch()

    const createBox = useCallback(
        () => {
            const pos = {x:0,y:0,z:0};
            return dispatch(addBoxToScene({pos}))
        },
        [dispatch]
    )
    

    return (
        <div>
            <Button color="primary" onClick={createBox}>Add cube</Button>
            <Button color="primary">Add sphere</Button> 
            <Button color="primary">Inspect Shape</Button>
        </div>
    );
}
  