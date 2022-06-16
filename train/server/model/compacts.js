let mongoose = require("mongoose")

let schema = new mongoose.Schema({
  //合同号
  id: Number,
  //租户编号
  comId: Number,
  //租赁楼层
  level: {
    type: String,
    default: ""
  },
  //门牌编号
  doorNum: {
    type: Array,
    default: () => []
  },
  //合同开始时间
  beginTime: {
    type: Date,
    default: Date.now
  },
  //合同结束时间
  endTime: {
    type: Date,
    default: Date.now
  },
  memo: {
    type: String,
    default: ""
  }
})

let Compacts = mongoose.model("Compacts", schema, "compacts")

module.exports = Compacts
