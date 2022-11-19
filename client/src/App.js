import React, { useEffect, useState, Context, createContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import './scss/app.scss'
import NotFound from './pages/NotFound/NotFound'
import Cart from './pages/Cart/Cart'
import FullPizza from './components/Card/FullPizza'
import MainLayout from './layouts/MainLayout'

function App () {
  return (
          <Routes>
            <Route path='/' element={<MainLayout/>}>
            <Route path='' element={<Home />} />
             <Route path='cart' element={<Cart/>} />
             <Route path='pizza/:id' element={<FullPizza/>} />
             <Route path='*' element={<NotFound/>} />
            </Route>
          </Routes>
  
  )
}

export default App
