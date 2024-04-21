'use client';
import { createSlice } from '@reduxjs/toolkit';
import { range, sample } from 'lodash';
import menuList from 'contents/menuList';
import { menuInfo } from 'contents/menuList';
import { customers } from 'contents/rulse';

console.log(menuInfo);

const initialState = {
  score: 0,
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
      key.order = sample(menuList);
    },
    getScore: (state, action) => {
      const { score } = action.payload;
      state.score = state.score + score;
    },
    minusScore: (state) => {
      state.score = state.score - 30;
    },
    getInitCustonersState: (state, action) => {
      const { level2 } = action.payload;
      const basicList = menuInfo
        .filter((e) => !e.level2)
        .map((e) => e.ingredient);
      const defaultSetting = range(customers).reduce((all, curr, i) => {
        all[`customer${i + 1}`] = {
          order: level2 ? sample(menuList) : sample(basicList),
          status: 'waiting',
        };
        return all;
      }, {});

      console.log(defaultSetting);
      state = { ...state, ...defaultSetting };
      return state;
    },
  },
});

export const selectCustomer = (state) => state.customer;
export const {
  handleOvertime,
  handleCustomStatus,
  getNextOrder,
  getScore,
  minusScore,
  getInitCustonersState,
} = customerSlice.actions;

export default customerSlice.reducer;
