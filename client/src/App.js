import React, { useEffect, useState, Context, createContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import './scss/app.scss'
import NotFound from './pages/NotFound/NotFound'
import Cart from './pages/Cart/Cart'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from './redux/slice/filterSlice'

export const SearchContext = createContext()

function App () {
  const count = useSelector((state) => state.counter.count)
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState('')
  return (
     <div className="wrapper">
     <SearchContext.Provider value={{ searchValue, setSearchValue }}>
     <Header />
      <div className="content">
          <Routes>
             <Route path='/' element={<Home />} />
             <Route path='/cart' element={<Cart/>} />
             <Route path='*' element={<NotFound/>} />
          </Routes>
        </div>
     </SearchContext.Provider>
      </div>
  
  )
}

export default App
