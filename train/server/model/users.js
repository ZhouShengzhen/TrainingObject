let mongoose = require("mongoose")

//用户对象
let schema = new mongoose.Schema({
  id: Number,
  username: String,
  pwd: {
    type: String,
    select: false
  }
})

let Users = mongoose.model("Users", schema, "users")

module.exports = Users
