
import { Button, rgbToHex } from '@material-ui/core';

import { useSelector } from 'react-redux';

import {
    selectActiveShapeId,
    makeSelectShapeByIndexSelector
} from '../audioDemoSlice';

export default function InfoControls () {

    const Id = useSelector(selectActiveShapeId);
    const shape = useSelector(makeSelectShapeByIndexSelector(Id))

    const { type, id, position} = shape || {position:[]};
 
    return (
        <span style={{color:'rgb(180,180,180'}}>
           <p>Inspceting:{type} {id}</p>
           <p>X POS:{position[0]}</p>
           <p>Y POS:{position[1]}</p>
           <p>Z POS:{position[2]}</p>
        </span>
    );
}