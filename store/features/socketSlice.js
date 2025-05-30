import { createSlice } from '@reduxjs/toolkit';

// 初始狀態
const initialState = {
  competitorInfo: undefined,
  roomId: undefined,
  isHost: false,
  isOpponentConnected: false,
  isHostDisconnected: false,
  socket: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    clearSocket: (state) => {
      state.socket = null;
    },
    setCompetitorInfo: (state, action) => {
      state.competitorInfo = action.payload;
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    setIsHost: (state, action) => {
      state.isHost = action.payload;
    },

    setHostDisconnected: (state, action) => {
      state.isHostDisconnected = action.payload;
    },
    handlePlayerJoined: (state, action) => {
      if (action.payload.playerName) {
        state.competitorInfo = action.payload.playerName;
        state.isOpponentConnected = true;
      }
    },
    handlePlayerDisconnected: (state, action) => {
      state.isOpponentConnected = false;
      state.competitorInfo = action.payload.playerName;
      state.isHostDisconnected = action.payload.isHostDisconnected;
    },
    handleHostInfo: (state, action) => {
      if (action.payload.hostName) {
        state.competitorInfo = action.payload.hostName;
      }
    },
    resetState: (state) => {
      return initialState;
    },
  },
});

export const {
  setSocket,
  clearSocket,
  setCompetitorInfo,
  setRoomId,
  setIsHost,
  setHostDisconnected,
  handlePlayerJoined,
  handlePlayerDisconnected,
  handleHostInfo,
  resetState,
} = socketSlice.actions;

// Add selectors
export const selectSocket = (state) => state.socket;
export const selectCompetitorInfo = (state) => state.socket.competitorInfo;
export const selectRoomId = (state) => state.socket.roomId;
export const selectIsHost = (state) => state.socket.isHost;
export const selectIsOpponentConnected = (state) =>
  state.socket.isOpponentConnected;
export const selectIsHostDisconnected = (state) =>
  state.socket.isHostDisconnected;

export default socketSlice.reducer;
