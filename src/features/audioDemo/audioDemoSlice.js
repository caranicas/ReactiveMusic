import { createSlice } from '@reduxjs/toolkit';

import { createSelector } from 'reselect'

export const INSPECT = -1;
export const MAKE_SQUARE = 0;
export const MAKE_CIRCLE = 1;

//c

// doing this on ther cheap
let boxId = 0; 
const BoxRecord = (pos) => {
    const {x, y, z} = pos;
    return {
        position:[x, y, z],
        id: ++boxId
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

    addBoxToScene: (state, action) => {
        const {payload: { pos }} = action;
        // todo set these to keys
        const record = BoxRecord(pos);
        state.shapes.push(record);
    }
  },
});

export const { setEditAction, addBoxToScene } = audioDemoSlice.actions;

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

// export const selectCurentShape = (index) => createSelector(
//   selectAudioDemoDomain,
//   audioDemo => audioDemo.shapes.filter(shape => shape.selected)
// );

export default audioDemoSlice.reducer;
