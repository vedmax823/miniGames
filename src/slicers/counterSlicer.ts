import { createSlice} from '@reduxjs/toolkit'



export interface CountState {
  count : number
}


const initialState: CountState = {
  count : 0
}

export const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    addCount: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      //console.log(board.payload)
      state.count += action.payload
    },
    newCount: (state) => {
      state.count = 0
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { addCount, newCount } = countSlice.actions

export default countSlice.reducer