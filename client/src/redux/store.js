import { configureStore } from '@reduxjs/toolkit'
import filter from './slice/filterSlice'
import cart from './slice/CartSlice'

export const store = configureStore({
  reducer: { filter, cart }
})
