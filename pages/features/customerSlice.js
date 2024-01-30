import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { range, sample } from 'lodash';
import foodList from 'contents/foodList';
import defaultConfig from 'contents/rootConfig';

const defaultSetting = range(defaultConfig.customers).reduce((all, curr, i) => {
  all[`customer${i + 1}`] = { order: sample(foodList), status: 'waiting' };
  return all;
}, {});

const initialState = {
  ...defaultSetting,
  status: 'customer',
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    handleOvertime: (state, action) => {
      const { id, status } = action.payload;
      const key = state[id];
      key.overtime = status;
    },
    handleCustomStatus: (state, action) => {
      const { id, status } = action.payload;
      const key = state[id];
      key.status = status;
    },
    getNextOrder: (state, action) => {
      const { id } = action.payload;
      const key = state[id];
      key.order = sample(foodList);
    },
  },
});

export const seleteCustomer = (state) => state.customer;
export const { handleOvertime, handleCustomStatus, getNextOrder } =
  customerSlice.actions;

export default customerSlice.reducer;
