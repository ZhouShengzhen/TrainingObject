let mongoose = require("mongoose")

//用户对象
let schema = new mongoose.Schema({
  comName: String,
  name: String,
  certType: String,
  certNum: String,
  levels: Array,
  callNum: String,
  position: {
    type: String,
    default: "实习生"
  }
})

let Staffs = mongoose.model("Staffs", schema, "staffs")

module.exports = Staffs
