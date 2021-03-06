import {  useCallback, useRef } from 'react';

import {  useSelector, useDispatch } from 'react-redux';


import { Canvas, useThree} from 'react-three-fiber';


import {Raycaster, Vector3, Vector2 } from 'three';

import { Box, dreiBox } from '../../primatives/Box';

import { Sphere } from '../../primatives/Sphere';

import CustomCamera from './CustomCamera';
import EditControls from './controls/editControls';
import InfoControls from './controls/infoControls';
import SpotifyPlayer from 'react-spotify-web-playback';


import styles from './audioDemo.module.css';

import { 
    INSPECT, MAKE_SQUARE, MAKE_CIRCLE,
    addBoxToScene, addSphereToScene,
    selectCubes, selectSpheres, selectCurrentAction, 
    selectDemoSpotifyToken
} from './audioDemoSlice';

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


function SphereList (props) {
    const { spheres } = props;
    return spheres.map((sphere) => {
        //console.log('sphere', sphere);
        return (
            <Sphere key={sphere.id} position={sphere.position} />
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

    const boxes = useSelector(selectCubes);
    const spheres = useSelector(selectSpheres);
    const action = useSelector(selectCurrentAction);
    const spotifyToken = useSelector(selectDemoSpotifyToken);


    const cameraRef = useRef();
    const raycaster = new Raycaster();
    const clickCanvas = useCallback(
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
            //const { scene } = useThree();

            const ShapeInspect = () => {
                console.log('she can inspect me...')
                const mouse = new Vector3();
                mouse.x = ( offsetX/ clientWidth ) * 2 - 1;
                mouse.y = - ( offsetY / clientHeight ) * 2 + 1;
                mouse.z = -1;
                raycaster.setFromCamera( mouse, cameraRef.current );
    
                //const intersects = raycaster.intersectObjects( scene.children );
            }

            const addBox = () => { 
                // good enough for now.
                // this needs to work regardless of FOV and camera depth
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
            };

            const addSphere = () => { 
                // dry this up with above
                // good enough for now.
                // this needs to work regardless of FOV and camera depth
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
                return dispatch(addSphereToScene({pos}))
            }

            if(action == INSPECT) {
                return ShapeInspect();
            }
            else if(action == MAKE_SQUARE) {
                return addBox();
            }
            else if(action == MAKE_CIRCLE) {
                return addSphere();
            }

        },
        [dispatch, action]
    );
    return (
        <>
            <div className={styles.canvasContainer}>
                <Canvas style={{ position: 'absolute', top:'0' }} onClick={clickCanvas}>
                    <CustomCamera ref={cameraRef} fov={30} position={[0, 0, camDepth]} />
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <BoxList boxes={boxes} ></BoxList>
                    <SphereList spheres={spheres} ></SphereList>
                </Canvas>
            </div>
            <EditControls></EditControls>
            <InfoControls></InfoControls>

            <SpotifyPlayer
                token={spotifyToken}
                uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
            />
        </>
    );
};