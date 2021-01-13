import { useRef, useState } from 'react';
import { useFrame, extend } from 'react-three-fiber'

import { RoundedBox } from '@react-three/drei'
export function dreiBox() {
  return (
      <RoundedBox>
          <meshPhongMaterial attach="material" color="#f3f3f3" />
      </RoundedBox>
  );
};

export function Box(props) {
  // This reference will give us direct access to the mesh
  const { reactive } = props;

  const mesh = useRef();

  // @TODO set for each dimention, and for each shape
  const baseScale = 2;
  const fullScale =  [(baseScale*reactive),(baseScale*reactive),(baseScale*reactive)];

  // if()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={fullScale}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};