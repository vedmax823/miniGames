import { configureStore } from '@reduxjs/toolkit'

import boardReducer from '../slicers/boardSlice'
import counterReducer from '../slicers/counterSlicer'
import figureListReducer from '../slicers/figureListSlice'

export const store = configureStore({
    reducer: {
        board : boardReducer,
        figureList : figureListReducer,
        count: counterReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch