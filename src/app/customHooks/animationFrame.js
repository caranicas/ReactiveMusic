import React, { useEffect, useRef } from 'react';

// const requestRef = React.useRef();

//https://css-tricks.com/using-requestanimationframe-with-react-hooks/
// export const useAnimationFrame = (callback) => {
//   // console.log(
//   //   'useAnimationFrame', playing
//   // )
//   // Use useRef for mutable variables that we want to persist
//   // without triggering a re-render on their change
//   const requestRef = React.useRef();
//   const previousTimeRef = React.useRef();
  
//   const animate = time => {
//     if (previousTimeRef.current != undefined) {
//       const deltaTime = time - previousTimeRef.current;
//       callback(deltaTime);
//     }
//     previousTimeRef.current = time;
//     requestRef.current = requestAnimationFrame(animate);
//   }
  
//   React.useEffect(() => {
//     requestRef.current = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(requestRef.current);
//   }, []); // Make sure the effect runs only once
// };

// @TODO import this instead. just wanted to see the 2 side by side 
//https://github.com/franciscop/use-animation-frame/blob/master/index.js
export const reUseAnimationFrame = (cb, deps) => {
  const frame = useRef();
  const last = useRef(performance.now());
  const init = useRef(performance.now());

  const animate = () => {
    const now = performance.now();
    const time = (now - init.current) / 1000;
    const delta = (now - last.current) / 1000;
    // In seconds ~> you can do ms or anything in userland
    cb({ time, delta });
    last.current = now;
    frame.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    frame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame.current);
  }, deps); // Make sure to change it if the deps change
};