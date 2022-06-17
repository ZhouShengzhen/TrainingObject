let mongoose = require("mongoose")

let schema = new mongoose.Schema({
  comName: String,
  username: String,
  deadTime: {
    type: Date,
    default: Date.now()
  },
  cardNum: String,
  id: Number,
  status: String
})

let Cards = mongoose.model("Cards", schema, "cards")

module.exports = Cards
