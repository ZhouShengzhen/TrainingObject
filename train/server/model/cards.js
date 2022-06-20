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
  status: String,
  possessed: {
    type: Boolean,
    default: true
  },
  faceUnlock: {
    type: Boolean,
    default: true
  }
})

let Cards = mongoose.model("Cards", schema, "cards")

module.exports = Cards
