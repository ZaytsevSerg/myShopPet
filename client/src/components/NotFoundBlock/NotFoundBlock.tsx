import React from 'react'
import styles from '../NotFoundBlock/NotFoundBlock.module.scss'

console.log(styles)
const NotFoundBlock: React.FC =() =>{
  return (
    <div className={styles.root}>
        <h1 >
       <span> &#128530;</span>
          <br/>
            Ничего не найдено
        </h1>
        <p className={styles.description}>К сожалению данная страница отстутствует в нашем интернет-магазине  </p>
        </div>
  )
}

export default NotFoundBlock
