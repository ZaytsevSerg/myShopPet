import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId, setCurrentPage } from '../../redux/slice/filterSlice'
import ReactPaginate from 'react-paginate'
import { SearchContext } from '../../App'
import { setSort } from '../../redux/slice/sortSlice'

import Card from '../../components/Card/Card'
import Skeleton from '../../components/Card/Skeleton'
import Categories from '../../components/Categories/Categories'
import Pagination from '../../components/Pagination/Pagination'
import Sort from '../../components/Sort/Sort'

const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId)
  const sortType = useSelector((state) => state.sorting.sort.sortProperty)
  const { currentPage } = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const { searchValue } = useContext(SearchContext)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // const [currentPage, setCurrentPage] = useState(1)
  
  // useEffect(() => {
  //   fetch('https://635fc15dca0fe3c21aa3b607.mockapi.io/items?category=' + categoryId)
  //     .then((res) => res.json())
  //     .then((arr) => {
  //       setItems(arr)
  //     })
  // }, [categoryId])

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  useEffect(() => {
    setIsLoading(true)
    const order = sortType.includes('-') ? 'asc' : 'desc'
    const sortBy = sortType.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    axios.get(
      `https://635fc15dca0fe3c21aa3b607.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}
        `)
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err))
    setIsLoading(false)
    window.scrollTo(0, 0)
  }, [categoryId, sortType, searchValue, currentPage])

  const pizzas = items.map((obj) => <Card key={obj.id}{...obj}/>)
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

  return (
    <div className="container">

     <div className="content__top">
              <Categories value = {categoryId} onChangeCategory={onChangeCategory}/>
              <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading 
              ? skeletons
              : pizzas }
          </div>
          <Pagination currentPage = {currentPage} onChangePage={onChangePage}/>
    </div>
  )
}
export default Home
