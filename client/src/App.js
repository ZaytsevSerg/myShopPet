import React, { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Categories from './components/Categories/Categories'
import Sort from './components/Sort/Sort'
import Card from './components/Card/Card'
import './scss/app.scss'
import axios from 'axios'

function App () {
  const [items, setItems] = useState([])

  // useEffect(() => {
  //   fetch('https://635fc15dca0fe3c21aa3b607.mockapi.io/items')
  //     .then((res) => res.json())
  //     .then((arr) => {
  //       setItems(arr)
  //     })
  // }, [])

  useEffect(() => {
    axios.get('https://635fc15dca0fe3c21aa3b607.mockapi.io/items')
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
     <div className="wrapper">
      <Header/>
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories/>
              <Sort/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((obj) => (
            <Card key={obj.id}{...obj}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
