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
        selected:false,
        type:CUBE
    };
};

const ShpereRecord = (pos) => {
  const {x, y, z} = pos;
  return {
      position:[x, y, z],
      id: ++shapeId,
      selected:false,
      type:SPHERE
  };
};

export const audioDemoSlice = createSlice({
  name: 'audioDemo',
  initialState: {
    perspective: 'X',
    action: INSPECT,
    shapes:[],
    lights:[]
  },
  reducers: {

    setEditAction:  (state, action) => {
      state.action = action.payload;
    },

    setShapeIndexActive: (state, action) => {
      const { payload } = action;
      // todo make this more effiecent.
      state.shapes.forEach(shape => shape.selected = false);
      const active = state.shapes.filter(shape => shape.id === payload);
      debugger;
      active[0].selected = true;
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
  }
  },
});

export const { setEditAction, addBoxToScene, addSphereToScene, setShapeIndexActive } = audioDemoSlice.actions;

export const selectAudioDemoDomain = state => state.audioDemo;

export const selectCurrentPerspective = createSelector(
  selectAudioDemoDomain,
  audioDemo => audioDemo.perspective
);

export const selectCurrentAction = createSelector(
  selectAudioDemoDomain,
  audioDemo => audioDemo.action
);

export const selectDemoShapes = createSelector(
    selectAudioDemoDomain,
    audioDemo => audioDemo.shapes
);

export const selectCubes = createSelector(
  selectDemoShapes,
  shapes => shapes.filter(shape => shape.type == CUBE)
);

export const selectSpheres = createSelector(
  selectDemoShapes,
  shapes => shapes.filter(shape => shape.type == SPHERE)
);


export const selectActiveShapeId = createSelector(
  selectDemoShapes,
  shapes => shapes.filter(shape => shape.selected)[0].id
);




export const makeSelectShapeByIndexSelector = (index) => createSelector(
  selectDemoShapes,
  (shapes) => shapes[index]
);

export const makeIsShapeActiveSelector = (index) => createSelector(
  selectDemoShapes,
  (shapes) => shapes[index].selected === true
);

// export const selectCurentShape = (index) => createSelector(
//   selectAudioDemoDomain,
//   audioDemo => audioDemo.shapes.filter(shape => shape.selected)
// );

export default audioDemoSlice.reducer;
