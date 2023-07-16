import React, { useEffect, useState } from 'react'
import { ModelSelector } from '../components/ModelSelector'
import { MarkSelector } from '../components/MarkSelector'
import axios from 'axios'
import { CarsTable } from '../components/CarsTable'
import { consts } from '../utils/consts'

export const MainPage = () => {

  const [cars, setCars] = useState([]) // автомобили
  const [marks, setMarks] = useState() // марки
  const [models, setModels] = useState() // модели

  const [activeMark, setActiveMark] = useState() // выбранная марка
  const [activeModel, setActiveModel] = useState() // выбранные модели
  const [carsCount, setCarsCount] = useState() // количество автомобилей полученных с сервера


  const fetchCars = () => {
    (
      !activeMark ? axios.get(`${consts.MAIN_URL}/api/car/display/`)
    : !activeModel ? axios.get(`${consts.MAIN_URL}/api/car/display/?mark=${activeMark}`)
    : axios.get(`${consts.MAIN_URL}/api/car/display/?mark=${activeMark}&model=${activeModel}`)
    )
    .then((cars)=>{
      const response = cars.data
      setCars(response.cars);
      setMarks(response.allMarks)
      setModels(response.allModels)
      setCarsCount(response.carsCount)
    })
    .catch(error =>{
      console.log(error.message)
    })
  }

  // при смене марки или модели делаем новый запрос
  useEffect(() => {
    fetchCars();
  }, [activeMark, activeModel])

  // при смене марки, очищаем выбранные модели 
  useEffect(() => {
    setActiveModel([]);
  }, [activeMark])
  
  return (
    <>
      <MarkSelector
        marks={marks}
        setActiveMark={setActiveMark}
      />
      <ModelSelector
        models={models}
        activeModel={activeModel}
        setActiveModel={setActiveModel}
      />
      <CarsTable
        carsCount={carsCount}
        cars={cars}
      />
    </>
  )
}