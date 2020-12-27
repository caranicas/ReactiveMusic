import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import audioDemoReducer from '../features/audioDemo/audioDemoSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    audioDemo: audioDemoReducer,
  },
});
