const {Schema, model} = require('mongoose')


const CarSchema = new Schema({

  mark: {
    type: String,
    required : [true, 'У авто должна быть марка'],
  },

  model: {
    type: String,
  },

  engine: {
    power: {
      type: Number,
    },
    volume: {
      type: Number,
    },
    transmission: {
      type: String,
    },
    fuel: {
      type: String,
    },
  },

  drive: {
    type: String,
  },

  equipmentName: {
    type: String,
  },

  price: {
    type: Number,
  },

}, {timestamps: true});


module.exports = model('Car', CarSchema)
