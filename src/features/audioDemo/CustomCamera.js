
import React, { useEffect } from 'react';
import { useFrame, useThree } from 'react-three-fiber'

// export default function CustomCamera(props) {
//     const ref = useRef();
//     console.log(
//         'camera REF', ref
//     )
//     const { setDefaultCamera } = useThree();
//     useEffect(() => void setDefaultCamera(ref.current), [])
//     useFrame(() => ref.current.updateMatrixWorld())
//     return <perspectiveCamera ref={ref} {...props} />
// };

const CustomCamera = React.forwardRef((props, ref) => {
    const { setDefaultCamera, size} = useThree();
    
    useEffect(() => void setDefaultCamera(ref.current), [])
    useFrame(() => ref.current.updateMatrixWorld())

   return <perspectiveCamera ref={ref} {...props} />
});

export default CustomCamera;