import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
  const { order, sortBy, category, search, currentPage } = params
  const { data } = await axios.get(
        `https://635fc15dca0fe3c21aa3b607.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}
          `)
  return data
})

const initialState = {
  items: [],
  status: 'loading'
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems (state, action) {
      state.items = action.payload
    }
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading'
      state.items = []
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = 'success'
    },

    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error'
      state.items = []
    }
  }
})

export const selectPizzaData = (state) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
