import {  useSelector } from 'react-redux';

import { Canvas, extend } from 'react-three-fiber';


import { Box } from '../../primatives/Box';

import EditControls from './controls/editControls';

import styles from './audioDemo.module.css';
import { selectDemoShapes } from './audioDemoSlice';

import { RoundedBox } from '@react-three/drei'

function BoxList (props) {
    const { boxes } = props;
    return boxes.map((box) =>
        <Box key={box.id} position={[0, 0, 0]} />
    )
};
// extend({ RoundedBox })




export default function AudioDemo () {
    const boxes = useSelector(selectDemoShapes);
    const TestBox = () => {
        return (
            <RoundedBox>
                <meshPhongMaterial attach="material" color="#f3f3f3" />
            </RoundedBox>
        );
    }

    extend({ TestBox })

    return (
        <div id='AudioDemo'>
            <div className={styles.canvasContainer}>
                <Canvas style={{ position: 'absolute', top:'0' }}>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <BoxList boxes={boxes} ></BoxList>
                    <TestBox></TestBox>
                </Canvas>
            </div>
            <EditControls></EditControls>
        </div>
    );
}


{/* <Box position={[-1.2, 0, 0]} />
<Box position={[1.2, 0, 0]} /> */}
  