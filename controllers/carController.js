const Car = require("../models/car");


exports.createCar = async (req, res, next) => {

  const { mark, model, engine, drive, equipmentName, price } = req.body;

  try {
    const car = await Car.create({
      mark,
      model,
      engine: {
        power: engine.power,
        volume: engine.volume,
        transmission: engine.transmission,
        fuel: engine.fuel
      },
      drive,
      equipmentName,
      price,
    });
    res.status(201).json({ car })

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}


exports.displayCars = async (req, res, next) => {

  // const carsPerPage = 5 // кол-во отображаемых авто на одной странице
  // const pageNumber = Number(req.query.pageNumber) || 1; // номер активной страницы
  let carsCount = await Car.find({}).estimatedDocumentCount(); // количество машин
  
  let mark = req.query.mark || "All"
  let model = req.query.model || "All"

  // находим все существующие марки (считаем кол-во авто каждой марки)
  const findAllMarks = (obj, option) => {
    const allOptions = {}
    obj.forEach(el => {
      if (allOptions[el[option]]) {
        allOptions[el[option]] += 1
      } else {
        allOptions[el[option]] = 1
      }
    });
    return allOptions // возвращаем объект
  }

  // находим все существующие модели заданной марки
  const findAllModels = (obj, mark) => {
    const allOptions = []
    obj.forEach(el => {
      allOptions.push(el[mark])
    });
    return allOptions // возвращаем массив
  }

  // создаём объект где будем хранить все марки и их кол-во
  const filterMark = findAllMarks(await Car.find(), "mark")
  // создаём массив где будем хранить все модели выбранной марки
  // если марка не выбрана массив будет пустой []
  const filterModel = findAllModels(await Car.find({mark: mark}), "model")

  mark === "All"
    ? (mark = [...(Object.keys(filterMark))])
    : (mark = req.query.mark.split(","))
  model === "All"
    ? (model = [...filterModel])
    : (model = req.query.model.split(","))

  // убираем лишнее из запроса
  // const queryObj = { ...req.query }
  // const excludedFields = ["page"]
  // excludedFields.forEach(el => delete queryObj[el])
 
  try {
    let cars = await Car.find()
    if (mark.length === 1 && model.length === 0) {
      cars = await Car.find({mark: mark})
    }
    else if (mark.length === 1 && model.length > 0) {
      cars = await Car.find({$and:[{mark: mark}, {model: model}]})
    }
    res.status(201).json({
      cars,
      carsCount,
      allMarks: filterMark,
      allModels: filterModel
    })
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}
