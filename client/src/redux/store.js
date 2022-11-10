import { configureStore } from '@reduxjs/toolkit'
import filter from './slice/filterSlice'
import sorting from './slice/sortSlice'

export const store = configureStore({
  reducer: { filter, sorting }
})
