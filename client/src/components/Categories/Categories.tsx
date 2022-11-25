import React, { memo, useMemo, useState } from 'react'
import {useWhyDidYouUpdate} from 'ahooks'

type CategoriesProps = {
  value: number;
  onChangeCategory: (idx: number) => void;
}

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые'
  ]
export const Categories: React.FC<CategoriesProps> = memo(({ value, onChangeCategory }) => {

  return (
      <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
        <li key={index}
         onClick={() => onChangeCategory(index)}
         className={value === index ? 'active' : ''}>
          {categoryName}
          </li>
        ))}
      </ul>
    </div>
  )
})

export default Categories