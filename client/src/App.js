import React from 'react'
import Header from './components/Header/Header'
import Categories from './components/Categories/Categories'
import Sort from './components/Sort/Sort'
import Card from './components/Card/Card'
import './scss/app.scss'
import db from './assets/db.json'

console.log(db)

function App () {
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
            {db.map(obj =>
            <Card {...obj}/>)}
                {/* <Card title ='Мексиканская' price='500'/>
                <Card title ='Студенческая' price='456'/>
                <Card title ='Домашняя' price='379'/>
                <Card title ='Пепперони' price='432'/>
                <Card title ='Диабло' price='765'/>
                <Card title ='С ананасом' price='375'/>
                <Card title ='Веган' price='543'/>
                <Card title ='Мясная' price='832'/> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
