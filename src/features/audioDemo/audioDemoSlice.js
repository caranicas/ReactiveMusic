import { createSlice } from '@reduxjs/toolkit';

import { createSelector } from 'reselect'

export const INSPECT = -1;
export const MAKE_SQUARE = 0;
export const MAKE_CIRCLE = 1;

const CUBE = 'CUBE';
const SPHERE = 'SPHERE';

// doing this on the cheap
let shapeId = -1; 
const BoxRecord = (pos) => {
    const {x, y, z} = pos;
    return {
        position:[x, y, z],
        id: ++shapeId,
        active:false,
        type:CUBE
    };
};

const ShpereRecord = (pos) => {
  const {x, y, z} = pos;
  return {
      position:[x, y, z],
      id: ++shapeId,
      active:false,
      type:SPHERE
  };
};

export const audioDemoSlice = createSlice({
  name: 'audioDemo',
  initialState: {
    perspective: 'X',
    action: INSPECT,
    shapes:[],
    lights:[],
    spotify:{
      //token, type, expire
    }
  },
  reducers: {
    setEditAction:  (state, action) => {
      state.action = action.payload;
    },

    setShapeIndexActive: (state, action) => {
      const { payload } = action;
      // todo make this more effiecent.
      state.shapes.forEach(shape => shape.active = false);
      const updateShape = state.shapes.filter(shape => shape.id === payload)[0];
      updateShape.active = true;
    },

    addBoxToScene: (state, action) => {
        const {payload: { pos }} = action;
        // todo set these to keys
        const record = BoxRecord(pos);
        state.shapes.push(record);
    },

    addSphereToScene: (state, action) => {
      const {payload: { pos }} = action;
      // todo set these to keys
      const record = ShpereRecord(pos);
      state.shapes.push(record);
    },

    // setSpofityTokenInfo: (state, action) => {
    //   console.log(
    //     'spotify info', action
    //   )
    //   const{payload: {token, type, expire}} = action

    //   state.spotify = {
    //     token, type, expire
    //   }
    // }
  },
});

export const { setEditAction, addBoxToScene, addSphereToScene, setShapeIndexActive, setSpofityTokenInfo } = audioDemoSlice.actions;

export const selectAudioDemoDomain = state => state.audioDemo;

export const selectCurrentPerspective = createSelector(
  selectAudioDemoDomain,
  audioDemo => audioDemo.perspective
);

export const selectCurrentAction = createSelector(
  selectAudioDemoDomain,
  audioDemo => audioDemo.action
);


export const selectDemoSpotifyToken = createSelector(
  selectAudioDemoDomain,
  audioDemo => audioDemo.spotify.token
);


export const selectDemoShapes = createSelector(
    selectAudioDemoDomain,
    audioDemo => audioDemo.shapes
);

export const selectActiveShapeId = createSelector(
  selectDemoShapes,
  shapes => shapes.filter(shape => shape.active)[0]?.id
);

export const selectCubes = createSelector(
  selectDemoShapes,
  shapes => shapes.filter(shape => shape.type == CUBE)
);

export const selectSpheres = createSelector(
  selectDemoShapes,
  shapes => shapes.filter(shape => shape.type == SPHERE)
);

export const makeSelectShapeByIndexSelector = (index) => createSelector(
  selectDemoShapes,
  (shapes) => shapes[index]
);


export default audioDemoSlice.reducer;
