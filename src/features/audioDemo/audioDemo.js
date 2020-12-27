import {  useCallback, useRef } from 'react';

import {  useSelector, useDispatch } from 'react-redux';


import { Canvas } from 'react-three-fiber';


import {Raycaster, Vector3, Vector2 } from 'three';

import { Box, dreiBox } from '../../primatives/Box';

import CustomCamera from './CustomCamera';
import EditControls from './controls/editControls';
import InfoControls from './controls/infoControls';

import styles from './audioDemo.module.css';
import { addBoxToScene, selectDemoShapes, selectCurrentPerspective } from './audioDemoSlice';

function BoxList (props) {
    const { boxes } = props;

    return boxes.map((box) => {
        //console.log('box', box);
        return (
            <Box key={box.id} position={box.position} />
        );
        /**            <dreiBox></dreiBox> */
    })
};



// function screenToWorld(_screenPos)
// {
//     var worldPos = _screenPos.clone();
//     worldPos.x = worldPos.x / windowHalfX - 1;
//     worldPos.y = - worldPos.y / windowHalfY + 1;
//     projector.unprojectVector( worldPos, camera );
//     return worldPos;                    
// }



export default function AudioDemo () {

    const camDepth = 10;

    const dispatch = useDispatch();

    const boxes = useSelector(selectDemoShapes);

    const perspective = useSelector(selectCurrentPerspective);

    const cameraRef = useRef();

    const raycaster = new Raycaster();
    const dropShape = useCallback(
        (e) => {
            const { 
            nativeEvent: {
                offsetX, 
                offsetY,
                // might need to use layer if offset doesnt exist 
                layerX,
                layerY,
            },
            target: {
                clientWidth,
                clientHeight,
            }} = e;

            // good enough for now.
            const mouse = new Vector3();
            mouse.x = ( offsetX/ clientWidth ) * 2 - 1;
            mouse.y = - ( offsetY / clientHeight ) * 2 + 1;
            mouse.z = -1;
            raycaster.setFromCamera( mouse, cameraRef.current );
            let {ray: {direction, direction: {x,y,z}}} = raycaster;
            // not sure why i need to multiply it by this... 
            x *= camDepth;
            y *= camDepth;
            const pos = {x, y, z:0};
            return dispatch(addBoxToScene({pos}))

        },
        [dispatch]
    );

    return (
        <>
            <div className={styles.canvasContainer}>
                <Canvas style={{ position: 'absolute', top:'0' }} onClick={dropShape}>
                    <CustomCamera ref={cameraRef} fov={30} position={[0, 0, camDepth]} />
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <BoxList boxes={boxes} ></BoxList>
                </Canvas>
            </div>
            <EditControls></EditControls>
            <InfoControls></InfoControls>
        </>
    );
};