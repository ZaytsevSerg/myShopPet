// import React, { useContext, useEffect, useRef, useState } from 'react'
// import qs from 'qs'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import Categories from '../components/Categories'
// import Sort, { list } from '../components/Sort'
// import CardItem from '../components/CardItem'
// import CardForm from '../components/CardForm'
// import Pagination from '../components/Pagination'
// import { AppContext } from '../App'
// import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'

// const Home = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const isSearch = useRef(false)
//   const isMounted = useRef(false)

//   const { categoryId, sort, currentPage } = useSelector((state) => state.filter)
 
//   const { searchVal } = useContext(AppContext)
//   const [items, setItems] = useState([])
//   const [loading, setLoading] = useState(true)
    
//   const onClickCategory = (id) => {
//     dispatch(setCategoryId(id))
//   }

//   const onChangePage = number => {
//     dispatch(setCurrentPage(number))
//   }
  
//   const fetchPizzas = () => {
//     setLoading(true)
    
//     const order = sort.sortProp.includes('-') ? 'asc' : 'desc'
//     const sortBy = sort.sortProp.replace('-', '')
//     const category = categoryId > 0 ? `category=${categoryId}` : ''
//     const search = searchVal ? `&search=${searchVal}` : ''
    
//     axios.get(
//       `https://635a3df76f97ae73a6275b58.mockapi.io/foodshop?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
//       .then((res) => {
//         setItems(res.data)
//         setLoading(false)
//       })
//   }

//   useEffect(() => {
//     if (isMounted.current) {
//       const queryString = qs.stringify({
//         sortProp: sort.sortProp,
//         categoryId,
//         currentPage
//       })
//       navigate(`?${queryString}`)
//     }
//     isMounted.current = true
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [categoryId, sort.sortProp, currentPage])
    
//   useEffect(() => {
//     if (window.location.search) {
//       const params = qs.parse(window.location.search.substring(1))
      
//       const sort = list.find(obj => obj.sortProp === params.sortProp)
      
//       dispatch(setFilters({
//         ...params,
//         sort
//       }))
//       isSearch.current = true
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])
  
//   useEffect(() => {
//     window.scrollTo(0, 0)
    
//     if (!isSearch.current) {
//       fetchPizzas()
//     }
//     isSearch.current = false
//   }, [categoryId, sort.sortProp, searchVal, currentPage])
   
//   const pizzas = items.map((obj) => <CardItem key={obj.id} {...obj} />)
//   const skeleton = [...new Array(6)].map((_, index) => <CardForm key={index}/>)

//   return (
//     <div className='container'>
//     <div className="content__top">
//         <Categories value={categoryId} onClickCategory={onClickCategory} />
//         <Sort />
//           </div>
//           <h2 className="content__title">Все пиццы</h2>
//       <div className="content__items">{loading ? skeleton : pizzas}</div>
//       <Pagination currentPage={currentPage} onChangePage={onChangePage} />
//       </div>
//   )
// }

// export default Home
