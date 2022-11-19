import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function FullPizza () {
  const [pizza, setPizza] = useState()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPizza () {
      try {
        const { data } = await axios.get('https://635fc15dca0fe3c21aa3b607.mockapi.io/items/' + id)
        setPizza(data)
      } catch (error) {
        alert('Ощибка при получении пиццы!')
        navigate('/')
      }
    }

    fetchPizza()
  }, [])
  if (!pizza) {
    return 'Загрузка...'
  }
  return (
    <div className='container'>
        <img src={pizza.imageUrl} />
        <h2>{pizza.title}</h2>
       
    <h4>{pizza.price} ₽</h4>
    </div>
  )
}
