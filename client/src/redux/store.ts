import { configureStore } from '@reduxjs/toolkit'
import filter from './slice/filterSlice'
import cart from './slice/CartSlice'
import pizza from './slice/pizzasSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: { filter, cart, pizza }
})

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()