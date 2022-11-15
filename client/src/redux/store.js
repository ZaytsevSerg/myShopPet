import { configureStore } from '@reduxjs/toolkit'
import filter from './slice/filterSlice'

export const store = configureStore({
  reducer: { filter }
})
