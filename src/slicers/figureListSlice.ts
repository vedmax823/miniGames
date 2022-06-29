import { createSlice} from '@reduxjs/toolkit'
import { FigureList } from '../games/blockGame/models/FigureList'
import { OneBrick } from '../games/blockGame/models/figures/oneBrick'


export interface FigureListState {
  figureList : FigureList
}




const initialState: FigureListState = {
  figureList : new FigureList()
}

export const figureListSlice = createSlice({
  name: 'figureList',
  initialState,
  reducers: {
    setFigure: (state, figureList) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      //console.log(state.figureList)
      let newFigureList = new FigureList()
      newFigureList.figureArr = figureList.payload.figureArr
      state.figureList = newFigureList
      
      //state.figureList
    },
    createNewFigureList: (state) => {
      state.figureList = new FigureList()
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { setFigure, createNewFigureList } = figureListSlice.actions

export default figureListSlice.reducer