import React, { useEffect, useState } from 'react'
import { Route, Router, Routes } from 'react-router-dom'

import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import './scss/app.scss'
import NotFound from './pages/NotFound/NotFound'
import Cart from './pages/Cart/Cart'

function App () {
  const [searchValue, setSearchValue] = useState('')
  return (
     <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
      <div className="content">
          <Routes>
             <Route path='/' element={<Home searchValue={searchValue}/>} />
             <Route path='/cart' element={<Cart/>} />
             <Route path='*' element={<NotFound/>} />
          </Routes>
        </div>
      </div>
  
  )
}

export default App
