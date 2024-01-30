import { configureStore } from '@reduxjs/toolkit';
import plateReducer from './features/plateSlice';
import customerReducer from './features/customerSlice';

export const store = configureStore({
  reducer: {
    plate: plateReducer,
    customer: customerReducer,
  },
});
