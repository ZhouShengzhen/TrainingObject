let mongoose = require("mongoose")

//用户对象
let schema = new mongoose.Schema({
  username: String,
  pwd: {
    type: String,
    select: false
  },
  avatar: {
    type: String,
    default: ""
  }
})

let Admins = mongoose.model("Admins", schema, "admins")

module.exports = Admins
