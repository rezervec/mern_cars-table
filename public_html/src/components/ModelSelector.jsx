import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { Spin } from 'antd';

export const ModelSelector = ({models, activeModel, setActiveModel}) => {

  // создадим новое состояние, чтобы приобразовать данные с бэка
  const [newModels, setNewModels] = useState()
  // P.S можно преобразовать данные и на бэкенде, но в данном случае это будет ошибкой

  const handleChange = (value) => {
    setActiveModel(value)
  };

  // преобразуем данные с бэка в нужный для antd-селектора вид
  const makeDataForSelector = (options) => {
    const arr = []
    options.forEach(el => {
      const obj = {}
      obj.value = el
      obj.label = el
      arr.push(obj)
    });
    return arr
  }

  useEffect(() => {
    if(models) {
      setNewModels( makeDataForSelector(models) )
    }
    console.log(newModels)
  }, [models])

  // если данные не получены то возвращаем лоадер
  if (!newModels) {
    return (
      <>
        <Spin />
      </>
    )
  }

  return (
    <>
      <div style={{marginBottom:'7px'}}>Модель:</div>
      <Select
        mode="tags"
        style={{
          width: '25%',
        }}
        placeholder="Выберите модель"
        onChange={handleChange}
        options={newModels}
        value={activeModel}
      />
    </>
  )
}
