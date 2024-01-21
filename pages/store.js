import { configureStore } from '@reduxjs/toolkit';
import plateReducer from './features/plateSlice';

export const store = configureStore({
  reducer: {
    plate: plateReducer,
  },
});
