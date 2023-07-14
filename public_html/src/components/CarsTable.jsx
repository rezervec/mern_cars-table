import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { convertIsoDate } from '../utils/convertDate'
import { consts } from '../utils/consts'


export const CarsTable = (cars, {carsCount}) => {
  const [newCars, setNewCars] = useState();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: consts.CARS_PER_PAGE,
    },
  });

  // данные о полях таблицы 
  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Марка/модель',
      dataIndex: 'mark',
      key: 'mark',
    },
    {
      title: 'Модификация',
      dataIndex: 'engine',
      key: 'engine',
    },
    {
      title: 'Комплектация',
      dataIndex: 'equipment',
      key: 'equipment',
    },
    {
      title: 'Стоимость',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Дата создания',
      dataIndex: 'date',
      key: 'date',
    },
  ];


  // преобразуем данные об автомобилях в удобный для нас формат
  const makeDataForTable = (arr) => {
    const allCars = []
    arr.forEach(obj => {
      const newObj = {}
      newObj.key = obj._id
      newObj.mark = `${obj.mark} ${obj.model}`
      newObj.engine =
        `
          ${obj.engine.volume.toFixed(1)} 
          ${obj.engine.transmission === 'Автомат' ? 'АМТ'
            : obj.engine.transmission === 'Механика' ? 'МТ'
            : obj.engine.transmission
          }
          (${obj.engine.power} л.с.)
          ${obj.drive}
        `
      newObj.equipment = obj.equipmentName
      newObj.price = `${obj.price.toLocaleString('ru')} ₽`
      newObj.date = convertIsoDate(obj.createdAt)
      allCars.push(newObj)
    });
    return allCars
  }


  useEffect(() => {
    setNewCars( makeDataForTable(cars.cars) )
  }, [cars])

  useEffect(() => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: carsCount,
      },
    });
  }, [carsCount])

  // useEffect(() => {
  //   fetchCars();
  // }, [JSON.stringify(tableParams)]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({ pagination, filters, ...sorter, });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setNewCars([]);
    }
  };

  // если данные не получены то возвращаем пустую таблицу
  if (!newCars) {
    return (
      <>
        <Table dataSource={[]} columns={columns} />
      </>
    )
  }

  return (
    <Table
      columns={columns}
      dataSource={newCars}
      pagination={tableParams.pagination}
      onChange={handleTableChange}
    />
  );
};