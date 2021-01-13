import { useRef, useState } from 'react';
import { useFrame, sphereBufferGeometry } from 'react-three-fiber'

export function Sphere(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();


  const { reactive } = props;

  console.log('S{HERE REACTIVE', reactive)

  // @TODO set for each dimention, and for each shape
  const baseScale = 1;
  const fullScale = [(baseScale*reactive),(baseScale*reactive),(baseScale*reactive)];

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  });

  //scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={fullScale}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <sphereBufferGeometry args={[.6, 10]} />
      <meshStandardMaterial color={hovered ? 'green' : 'blue'} />
    </mesh>
  );
};