import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { range, sample } from 'lodash';
import foodList from 'contents/foodList';

const settings = {
  customers: 3,
  plate: 3,
};

const p = range(settings.plate).reduce((all, curr, i) => {
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
      if (!state[plateKey]) {
        state[plateKey] = [];
      }
      state[plateKey].push(targetItem);
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
