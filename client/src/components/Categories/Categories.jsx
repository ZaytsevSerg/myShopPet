import React, { useState } from 'react'

export default function Categories () {
  const [activeCategory, setActivCategory] = useState(0)

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые'
  ]

  const onClickCategory = (index) => {
    setActivCategory(index)
  }

  return (
      <div className="categories">
      <ul>
        {categories.map((value, index) => (
        <li onClick={() => onClickCategory(index)} className={activeCategory === index ? 'active' : ''}>{value}</li>
        ))}
      </ul>
    </div>
  )
}
