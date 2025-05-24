'use client';

import { configureStore } from '@reduxjs/toolkit';
import plateReducer from './features/plateSlice';
import customerReducer from './features/customerSlice';
import gameConfigReducer from './features/gameConfigSlice';
import socketReducer from './features/socketSlice';

const store = configureStore({
  reducer: {
    plate: plateReducer,
    customer: customerReducer,
    gameConfig: gameConfigReducer,
    socket: socketReducer,
  },
});

export default store;
