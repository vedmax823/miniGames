import { createSlice} from '@reduxjs/toolkit'
import {Board} from '../games/blockGame/models/Board'

export interface BoardState {
  board : Board
}


const initialState: BoardState = {
  board : new Board()
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard: (state, board) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      //console.log(board.payload)
      state.board = board.payload
    },
    newBoard: (state) => {
      state.board = new Board()
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setBoard, newBoard } = boardSlice.actions

export default boardSlice.reducer