import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    loading:false
  },
  reducers: {
    setCreateScript: state => {
      state.loading = true;
    },
  },
});

export const { setCreateScript } = playerSlice.actions;

export default playerSlice.reducer;
