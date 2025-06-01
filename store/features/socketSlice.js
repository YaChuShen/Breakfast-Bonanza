import { createSlice } from '@reduxjs/toolkit';

// 初始狀態
const initialState = {
  competitorInfo: undefined,
  roomId: undefined,
  isHost: false,
  isOpponentConnected: false,
  isHostDisconnected: false,
  isPlayerReady: false,
  opponentScore: 0,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setCompetitorInfo: (state, action) => {
      state.competitorInfo = action.payload;
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    setIsHost: (state, action) => {
      state.isHost = action.payload;
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
        state.isOpponentConnected = true;
      }
    },
    handlePlayerReady: (state, action) => {
      if (action.payload.playerName) {
        state.isPlayerReady = true;
      }
    },
    updateOpponentScore: (state, action) => {
      state.opponentScore = action.payload.score;
    },
  },
});

export const {
  setCompetitorInfo,
  setRoomId,
  setIsHost,
  handlePlayerJoined,
  handlePlayerDisconnected,
  handleHostInfo,
  handlePlayerReady,
  updateOpponentScore,
} = socketSlice.actions;

// Add selectors
// export const selectSocket = (state) => state.socket;
export const selectCompetitorInfo = (state) => state.socket.competitorInfo;
export const selectRoomId = (state) => state.socket.roomId;
export const selectIsHost = (state) => state.socket.isHost;
export const selectIsOpponentConnected = (state) =>
  state.socket.isOpponentConnected;
export const selectIsPlayerReady = (state) => state.socket.isPlayerReady;
export const selectOpponentScore = (state) => state.socket.opponentScore;

export default socketSlice.reducer;
