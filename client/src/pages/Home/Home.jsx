import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Card from '../../components/Card/Card'
import Skeleton from '../../components/Card/Skeleton'
import Categories from '../../components/Categories/Categories'
import Sort from '../../components/Sort/Sort'

// useEffect(() => {
//   fetch('https://635fc15dca0fe3c21aa3b607.mockapi.io/items')
//     .then((res) => res.json())
//     .then((arr) => {
//       setItems(arr)
//     })
// }, [])
const Home = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get('https://635fc15dca0fe3c21aa3b607.mockapi.io/items')
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err))
    setIsLoading(false)
  }, [])
  return (
    <>
     <div className="content__top">
            <Categories/>
              <Sort/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading 
              ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
              : items.map((obj) => <Card key={obj.id}{...obj}/>)
            }
          </div>
    </>
  )
}
export default Home
