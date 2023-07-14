import React from 'react'
import style from '../styles/MarkSelector.module.scss'
import { Spin } from 'antd';


export const MarkSelector = ({marks, setActiveMark}) => {

  // если данные не получены то возвращаем лоадер
  if (!marks) {
    return (
      <>
        <Spin />
      </>
    )
  }

  return (
    <div className={style.marks}>
      {
        // итерируемся по обекту где ключ - это марка, а количество - это значение
        Object.entries(marks).map(key => 
          <div className={style.mark} key={key[0]}>
            <input
              type="radio"
              id={key[0]}
              name="mark"
              value={key[0]}
              onChange={() => setActiveMark(key[0])}
            />
            <label htmlFor={key[0]}>
              <span>{key[0]}</span>
              <tt>{key[1]}</tt>
            </label>
          </div>
        )
      }
    </div>
  )
}
