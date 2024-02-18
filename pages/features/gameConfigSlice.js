import { createSlice } from '@reduxjs/toolkit';

export const gameConfigSlice = createSlice({
  name: 'gameConfig',
  initialState: {
    trashCanOpen: false,
    score: 0,
  },
  reducers: {
    trashCanOpen: (state, action) => {
      const { value } = action.payload;
      state.trashCanOpen = value;
    },
  },
});

export const selectGameConfig = (state) => state.gameConfig;
export const { trashCanOpen } = gameConfigSlice.actions;

export default gameConfigSlice.reducer;
