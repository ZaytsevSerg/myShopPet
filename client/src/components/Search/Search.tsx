import React, { useContext, useEffect, useRef, useCallback, useState } from 'react'
import debounce from 'lodash.debounce'
import styles from './Search.module.scss'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slice/filterSlice'

export const Search: React.FC = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const onClickClear = () => {
    dispatch(setSearchValue(''))
    setValue('')
    inputRef.current?.focus()
  }

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str))
    }, 350),
    []
  )

  const onChangeInput = (event: any) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }
  return (
    <div className={styles.root}>
        <svg className={styles.icon}
            enableBackground="new 0 0 24 24" id="Layer_1"
            version="1.0"
            viewBox="0 0 24 24" 
             xmlns="http://www.w3.org/2000/svg"
         >
        <g><g><path d="M9,4c2.8,0,5,2.2,5,5s-2.2,5-5,5s-5-2.2-5-5S6.2,4,9,4 M9,2C5.1,2,2,5.1,2,9c0,3.9,3.1,7,7,7s7-3.1,7-7C16,5.1,12.9,2,9,2    L9,2z"/></g></g><g><polygon points="22,20.3 20.3,22 14,15.7 14,14 15.7,14  "/><rect height="3.6" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -5.9741 14.4227)" width="1.2" x="13.8" y="12.6"/></g></svg>
    <input
    ref={inputRef}
    value={value}
    onChange={onChangeInput}
    className={styles.input} 
    placeholder='Поиск пиццы:'
    />
    {value && (
    <svg onClick={onClickClear} className={styles.clearIcon} height="14px" version="1.1" viewBox="0 0 14 14" width="14px" xmlns="http://www.w3.org/2000/svg" ><title/><desc/><defs/><g fill="none" id="Page-1" stroke="none" strokeWidth="1"><g fill="#000000" id="Core" transform="translate(-341.000000, -89.000000)"><g id="close" transform="translate(341.000000, 89.000000)"><path d="M14,1.4 L12.6,0 L7,5.6 L1.4,0 L0,1.4 L5.6,7 L0,12.6 L1.4,14 L7,8.4 L12.6,14 L14,12.6 L8.4,7 L14,1.4 Z" id="Shape"/></g></g></g></svg>)}
            </div>
  )
}

export default Search
