import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Card from '../../components/Card/Card'
import Skeleton from '../../components/Card/Skeleton'
import Categories from '../../components/Categories/Categories'
import Sort from '../../components/Sort/Sort'

const Home = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryId, setCategoryId] = useState(0)
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'reting'
  })
  
  // useEffect(() => {
  //   fetch('https://635fc15dca0fe3c21aa3b607.mockapi.io/items?category=' + categoryId)
  //     .then((res) => res.json())
  //     .then((arr) => {
  //       setItems(arr)
  //     })
  // }, [categoryId])
  useEffect(() => {
    setIsLoading(true)
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sortType.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    axios.get(
      `https://635fc15dca0fe3c21aa3b607.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}
        `)
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err))
    setIsLoading(false)
    window.scrollTo(0, 0)
  }, [categoryId, sortType])

  return (
    <div className="container">

     <div className="content__top">
              <Categories value = {categoryId} onChangeCategory={(index) => setCategoryId(index)}/>
              <Sort value = {sortType} onChangeSort={(index) => setSortType(index)}/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading 
              ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
              : items.map((obj) => <Card key={obj.id}{...obj}/>)
            }
          </div>
    </div>
  )
}
export default Home
