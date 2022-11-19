import React, { useEffect, useState, useContext, useRef } from 'react'
import qs from 'qs'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../../redux/slice/filterSlice'
import { fetchPizzas, selectPizzaData } from '../../redux/slice/pizzasSlice'
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

  const { items, status } = useSelector(selectPizzaData)
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  const getPizzas = () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage
      })
    )
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
      getPizzas()
    }
    isSearch.current = false
  }, [categoryId, sort.sortProperty, searchValue, currentPage]
  )
  const pizzas = items.map((obj) => (
     <Link key={obj.id} to={`/pizza/${obj.id}`}><Card {...obj}/>
     </Link>
  ))
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
  
  return (
    <div className="container">

     <div className="content__top">
              <Categories value = {categoryId} onChangeCategory={onChangeCategory}/>
              <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
      {status === 'error'
        ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
        </div>
          )
        : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
          )}
          <Pagination currentPage = {currentPage} onChangePage={onChangePage}/>
    </div>
  )
}
export default Home
