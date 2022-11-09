import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slice/filterSlice'

export const store = configureStore({
  reducer: { counter: counterReducer }
})
