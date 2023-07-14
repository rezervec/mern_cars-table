import React, { useEffect, useState } from 'react'
import { ModelSelector } from '../components/ModelSelector'
import { MarkSelector } from '../components/MarkSelector'
import axios from 'axios'
import { CarsTable } from '../components/CarsTable'

export const MainPage = () => {

  const [cars, setCars] = useState([])
  const [marks, setMarks] = useState()
  const [models, setModels] = useState()

  const [activeMark, setActiveMark] = useState()
  const [activeModel, setActiveModel] = useState()
  const [carsCount, setCarsCount] = useState()


  const fetchCars = () =>{
    (
      !activeMark ? axios.get(`http://localhost:555/api/car/display/`)
    : !activeModel ? axios.get(`http://localhost:555/api/car/display/?mark=${activeMark}`)
    : axios.get(`http://localhost:555/api/car/display/?mark=${activeMark}&model=${activeModel}`)
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