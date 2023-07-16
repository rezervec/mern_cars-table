import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { convertDateForSort, convertIsoDate } from '../utils/convertDate'
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
      key: 'sort_price',
      sorter: {
        compare: (a, b) => b.sort_price - a.sort_price,
        multiple: 2,
      },
    },
    {
      title: 'Дата создания',
      dataIndex: 'date',
      key: 'sort_date',
      sorter: {
        compare: (a, b) => a.sort_date - b.sort_date,
        multiple: 1, // сравнение дат будем производить в последнюю очередь
      },
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
          ${obj.drive === '2WD' ? '' : obj.drive}
        `
      newObj.equipment = obj.equipmentName
      newObj.price = `${obj.price.toLocaleString('ru')} ₽`
      newObj.sort_price = obj.price
      newObj.date = convertIsoDate(obj.createdAt)
      newObj.sort_date = convertDateForSort(obj.createdAt)
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