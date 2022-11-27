import Loadable from 'react-loadable'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import React from 'react'
import './scss/app.scss'
import MainLayout from './layouts/MainLayout'
import { lazy, Suspense } from 'react'

const Cart = Loadable({
  loader: () => import ('./pages/Cart/Cart'),
  loading: () => <div>Идет загрузка корзины...</div>
})

const FullPizza = lazy(() => import('./pages/Card/FullPizza'))
const NotFound =  lazy(() => import ('./pages/NotFound/NotFound'))

function App () {
  return (
          <Routes>
            <Route path='/' element={<MainLayout/>}>
            <Route path='' element={<Home />} />
             <Route path='cart' element={
              <Suspense fallback={<div>Идет загрузка корзины...</div>}>
                <Cart/>
              </Suspense>} />
             <Route path='pizza/:id' element={
              <Suspense fallback={<div>Идет загрузка...</div>}>
                <FullPizza/>
              </Suspense>}/>
             <Route path='*' element={
              <Suspense fallback={<div>Идет загрузка...</div>}>
                <NotFound/>
             </Suspense>} />
            </Route>
          </Routes>
  
  )
}

export default App
