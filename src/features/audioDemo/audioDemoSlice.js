import { createSlice } from '@reduxjs/toolkit';

import { createSelector } from 'reselect'

const INSPECT = -1;
const MAKE_SQUARE = 0;
const MAKE_CIRCLE = 1;

// doing this on ther cheap
let boxId = 0; 
const BoxRecord = (pos) => {
    const {x, y, z} = pos;
    return {
        x, y, z,
        id: ++boxId
    };
};

export const audioDemoSlice = createSlice({
  name: 'audioDemo',
  initialState: {
    action: INSPECT,
    shapes:[],
    lights:[]
  },
  reducers: {
    setEditAction:  (state, action) => {
      state.action =  action.payload;
    },

    addBoxToScene: (state, action) => {
        console.log(
          'add box', action
        )
        const {payload: { pos }} = action;
        console.log(
          'add box', pos
        )
        state.shapes.push(BoxRecord(pos));
    }
  },
});

export const { setEditAction, addBoxToScene } = audioDemoSlice.actions;

export const selectAudioDemoDomain = state => state.audioDemo;

export const selectDemoShapes = createSelector(
    selectAudioDemoDomain,
    audioDemo => audioDemo.shapes
);
  

export default audioDemoSlice.reducer;
