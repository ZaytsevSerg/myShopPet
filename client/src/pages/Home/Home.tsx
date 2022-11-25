import React, { useEffect, useState, useContext, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {selectFilter} from '../../redux/filter/selectors'
import {setCategoryId} from '../../redux/filter/slice'
import {setCurrentPage} from '../../redux/filter/slice'

import { selectPizzaData } from '../../redux/pizza/selector'
import { fetchPizzas } from '../../redux/pizza/asyncActions'

import Card from '../../components/Card/Card'
import Skeleton from '../../components/Card/Skeleton'
import Categories from '../../components/Categories/Categories'
import Pagination from '../../components/Pagination/Pagination'
import Sort, { list } from '../../components/Sort/Sort'
import { useAppDispatch } from '../../redux/store'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { items, status } = useSelector(selectPizzaData)
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)

  const onChangeCategory = useCallback((idx : number) => {
    dispatch(setCategoryId(idx))
  },[])
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
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
        currentPage: String(currentPage),
      })
    )
    window.scroll(0,0)
  }
  
 
  useEffect(() => {
    getPizzas()
  }, [categoryId, sort.sortProperty, searchValue, currentPage])
//     useEffect(() => {
//     if (isMounted.current) {
//       const params = {
//         categoryId: categoryId > 0 ? categoryId : null,
//         sortProperty: sort.sortProperty,
//         currentPage,
//       };

//       const queryString = qs.stringify(params, { skipNulls: true });

//       navigate(`/?${queryString}`);
//     }

//     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams
//     const sort = list.find((obj) => obj.sortProperty === params.sortBy)
//     dispatch(
//       setFilters({
//       searchValue: params.search,
//       categoryId: Number(params.category),
//       currentPage: Number(params.currentPage),
//       sort: sort || list[0]
//     })
//     )

//     getPizzas()
//     isMounted.current = true;
//   }, [categoryId, sort.sortProperty, searchValue, currentPage])
//       //     if(!window.location.search){
//   //       dispatch(fetchPizzas({} as SearchPizzaParams))
//   //     }
//   // }, [categoryId, sort.sortProperty, searchValue, currentPage]);
  

//  React.useEffect(() => {
//     if (window.location.search) {
//       const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
//       const sort = list.find((obj) => obj.sortProperty === params.sortBy);
//       dispatch(
//         setFilters({
//           searchValue: params.search,
//           categoryId: Number(params.category),
//           currentPage: Number(params.currentPage),
//           sort: sort || list[0],
//         }),
//       );
//     }
//     isMounted.current = true;
//   }, []);

  // useEffect(() => {
  //   window.scrollTo(0, 0)
    
  //   if (!isSearch.current) {
  //     getPizzas()
  //   }
  //   isSearch.current = false
  // }, [categoryId, sort.sortProperty, searchValue, currentPage]
  // )
  const pizzas = items.map((obj: any) => <Card key={obj.id}{...obj} />)
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
  
  return (
    <div className="container">

     <div className="content__top">
              <Categories value = {categoryId} onChangeCategory={onChangeCategory}/>
              <Sort value={sort} />
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