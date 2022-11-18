import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: 
    {
      name: 'популярности',
      sortProperty: 'rating'
    }
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId (state, action) {
      state.categoryId = action.payload
    },
    setSearchValue (state, action) {
      state.searchValue = action.payload
    },
    setCurrentPage (state, action) {
      state.currentPage = action.payload
    },
    setSort (state, action) {
      state.sort = action.payload
    },
    setFilters (state, action) {
      state.currentPage = action.payload.sort
      state.currentPage = Number(action.payload.currentPage)
      state.currentPage = Number(action.payload.categoryId)
    }
  }
})
export const selectFilter = (state) => state.filter
export const selectSort = (state) => state.filter.sort

export const { setCategoryId, setCurrentPage, setSort, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer
