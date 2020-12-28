import {  useCallback, useRef } from 'react';

import {  useSelector, useDispatch } from 'react-redux';

import { Canvas, useThree} from 'react-three-fiber';

import {Raycaster, Vector3, Vector2 } from 'three';

import { Box, dreiBox } from '../../primatives/Box';

import { Sphere } from '../../primatives/Sphere';

import { useContextBridge } from '@react-three/drei';

import CustomCamera from './CustomCamera';
import EditControls from './controls/editControls';
import InfoControls from './controls/infoControls';

import styles from './audioDemo.module.css';

import { 
    INSPECT, MAKE_SQUARE, MAKE_CIRCLE,
    addBoxToScene, addSphereToScene,
    selectCubes, selectSpheres, selectCurrentAction, setShapeIndexActive, selectActiveShapeId,
    makeIsShapeActiveSelector
} from './audioDemoSlice';


import {
    shapeContext
} from './context';

function BoxList (props) {
    const { boxes } = props;

    const activeID = 0; //useSelector(selectActiveShapeId);
    return boxes.map((box) => {
        const isActive = true;//= activeID === box.id;
        return (
            <Box key={box.id} id={box.id} active={isActive} position={box.position} />
        );
        /**            <dreiBox></dreiBox> */
    })
};

function SphereList (props) {
    const { spheres } = props;
    return spheres.map((sphere) => {
        return (
            <Sphere key={sphere.id} id={sphere.id}  position={sphere.position} />
        );
    })
};




function AudioDemoScene () {

    const camDepth = 10;

    const dispatch = useDispatch();
    const boxes = useSelector(selectCubes);
    const spheres = useSelector(selectSpheres);
    const action = useSelector(selectCurrentAction);

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

            // const ShapeInspect = () => {
            //     console.log('she can inspect me...')
            //     const mouse = new Vector3();
            //     mouse.x = ( offsetX/ clientWidth ) * 2 - 1;
            //     mouse.y = - ( offsetY / clientHeight ) * 2 + 1;
            //     mouse.z = -1;
            //     raycaster.setFromCamera( mouse, cameraRef.current );
    
            //     //const intersects = raycaster.intersectObjects( scene.children );
            // }

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

            // if(action == INSPECT) {
            //     return ShapeInspect();
            // }

            if(action == MAKE_SQUARE) {
                return addBox();
            }
            else if(action == MAKE_CIRCLE) {
                return addSphere();
            }

        },
        [dispatch, action]
    );

    const ContextBridge = useContextBridge(shapeContext);

    return (
        <>
            <div className={styles.canvasContainer}>
                <Canvas style={{ position: 'absolute', top:'0' }}>
                    <CustomCamera ref={cameraRef} fov={30} position={[0, 0, camDepth]} />
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    {/* <ContextBridge> */}
                        <BoxList boxes={boxes} ></BoxList>
                    {/* </ContextBridge> */}
                    <SphereList spheres={spheres} ></SphereList>
                </Canvas>
            </div>
            <EditControls></EditControls>
            <InfoControls></InfoControls>
        </>
    );
};


        // <shapeContext.Provider value={{dispatch, setShapeIndexActive}}>
         // </shapeContext.Provider>
export default function AudioDemo() {
    //const dispatch = useDispatch();
    return (
        <AudioDemoScene></AudioDemoScene>
    );
         //   <AudioDemoScene></AudioDemoScene>
       
};



