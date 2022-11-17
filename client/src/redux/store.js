import { configureStore } from '@reduxjs/toolkit'
import filter from './slice/filterSlice'
import cart from './slice/CartSlice'
import pizza from './slice/pizzasSlice'

export const store = configureStore({
  reducer: { filter, cart, pizza }
})
