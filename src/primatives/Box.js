import { useRef, useState, useCallback, useContext } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useFrame } from 'react-three-fiber'

import { RoundedBox } from '@react-three/drei'

import {
  shapeContext
} from '../features/audioDemo/context';

// import { 
//   setShapeIndexActive,
//   makeIsShapeActiveSelector
// } from '../features/audioDemo/audioDemoSlice';


export function dreiBox() {
  return (
      <RoundedBox>
          <meshPhongMaterial attach="material" color="#f3f3f3" />
      </RoundedBox>
  );
};

export function Box(props) {

  // console.log(
  //   'BOX props ?', props.id
  // );
//  const { id, active } = props;
//  const { dispatch, setShapeIndexActive } = useContext(shapeContext);

  // const { key } = props;
  //const dispatch = useDispatch();

  //const key = 0;
  //const activeId = useSelector();

  //console.log('ACTIVE ID ',active, id)
  // const active = makeIsShapeActiveSelector(key)();
  // //const active = useSelector(makeIsShapeActiveSelector(key));
  // console.log(
  //   'BOX active ?', active
  // );
  //useSelector(active);
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);


  // const selectShape = useCallback(
  //   () => {
  //     console.log('CLICK SELECT SHAPE') 
  //     return dispatch(setShapeIndexActive(id));
  //   },
  //   [dispatch]
  // );


  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  });
  //scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}

   // onClick={selectShape}
      // onPointerOver={(event) => setHover(true)}
      // onPointerOut={(event) => setHover(false)}>
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};