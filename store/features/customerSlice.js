'use client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { range, sample } from 'lodash';
import menuList from 'contents/menuList';
import defaultConfig from 'contents/rootConfig';
import { menuInfo } from 'contents/menuList';

const list = menuInfo.map((e) => {
  return e.ingredient;
});

const defaultSetting = range(defaultConfig.customers).reduce((all, curr, i) => {
  all[`customer${i + 1}`] = {
    order: sample(list),
    status: 'waiting',
  };
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
      key.order = sample(list);
    },
  },
});

export const selectCustomer = (state) => state.customer;
export const { handleOvertime, handleCustomStatus, getNextOrder } =
  customerSlice.actions;

export default customerSlice.reducer;
