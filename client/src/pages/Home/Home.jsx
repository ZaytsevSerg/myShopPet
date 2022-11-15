import axios from 'axios'
import React, { useEffect, useState, useContext, useRef } from 'react'
import qs from 'qs'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCategoryId, setCurrentPage, setSort, setFilters } from '../../redux/slice/filterSlice'
import { SearchContext } from '../../App'

import Card from '../../components/Card/Card'
import Skeleton from '../../components/Card/Skeleton'
import Categories from '../../components/Categories/Categories'
import Pagination from '../../components/Pagination/Pagination'
import Sort, { list } from '../../components/Sort/Sort'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter)

  const { searchValue } = useContext(SearchContext)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  const fetchPizzas = () => {
    setIsLoading(true)

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    axios.get(
      `https://635fc15dca0fe3c21aa3b607.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}
        `)
      .then((res) => {
        setItems(res.data)
        setIsLoading(false)
      })
  }
  
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sort.sortProperty, currentPage])
  
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty)

      dispatch(
        setFilters({
          ...params,
          sort
        })
      )
      isSearch.current = true
    }
  }, [])
  
  useEffect(() => {
    window.scrollTo(0, 0)
    
    if (!isSearch.current) {
      fetchPizzas()
    }
    isSearch.current = false
  }, [categoryId, sort.sortProperty, searchValue, currentPage]
  )
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
