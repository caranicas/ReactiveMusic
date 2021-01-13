import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import audioDemoReducer from '../features/audioDemo/audioDemoSlice';

import playerReducer from '../features/player/playerSlice';
import spotifyReducer from '../features/spotify/spotifySlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    audioDemo: audioDemoReducer,
    player: playerReducer,
    spotify: spotifyReducer,
  },
  middleware:(getDefaultMiddleware) => [...getDefaultMiddleware({serializableCheck: false, immutableCheck: false})]
});

//(getDefaultMiddleware) => [...getDefaultMiddleware({immutableCheck: false})]