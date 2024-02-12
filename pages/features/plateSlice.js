import { createSlice } from '@reduxjs/toolkit';
import { range, sample } from 'lodash';
import defaultConfig from 'contents/rootConfig';

const p = range(defaultConfig.plate).reduce((all, curr, i) => {
  all[`plateContent${i + 1}`] = [];
  return all;
}, {});

const initialState = {
  ...p,
  status: 'idle',
  targetItem: '',
  targetPlate: '',
};

export const plateSlice = createSlice({
  name: 'plate',
  initialState,
  reducers: {
    addFood: (state, action) => {
      const { id, targetItem } = action.payload;
      const plateKey = `plateContent${id}`;
      if (!state[plateKey] || targetItem.length === 0) {
        state[plateKey] = [];
      } else {
        state[plateKey].push(targetItem);
      }
    },
    setTargetItem: (state, action) => {
      const { target } = action.payload;
      state.targetItem = target;
    },
    setTargetPlate: (state, action) => {
      const { index } = action.payload;
      state.targetPlate = index;
    },
  },
});

export const seletePlate = (state) => state.plate;
export const { addFood, setTargetItem, setTargetPlate } = plateSlice.actions;

export default plateSlice.reducer;
