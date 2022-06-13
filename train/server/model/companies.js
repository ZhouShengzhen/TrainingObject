let mongoose = require('mongoose')

let schema = new mongoose.Schema({
  //租户编号
  id: Number,
  //租户名称
  name: String,
  //租赁楼层
  level: {
    type: String,
    default: ''
  },
  //门牌编号
  doorNum: {
    type: Array,
    default: () => []
  },
  //租户行业
  business: {
    type: String,
    default: ''
  },
  //租户状态
  status: {
    type: String,
    default: ''
  },
  //联系电话
  callNum: {
    type: String,
    default: ''
  },
  //联系人
  callName: {
    type: String,
    default: ''
  },
  //租户细节
  //企业简称
  nameShort: {
    type: String,
    default: ''
  },
  //外文名
  nameEn: {
    type: String,
    default: ''
  },
  //税务登记号
  taxNum: {
    type: String,
    default: ''
  },
  //条形码
  barCode: {
    type: String,
    default: ''
  },
  //客户性质
  charater: {
    type: String,
    default: ''
  },
  //法人代表
  legalPer: {
    type: String,
    default: ''
  },
  //生产经营许可证
  license: {
    type: String,
    default: ''
  },
  //纳税人类型
  taxPayer: {
    type: String,
    default: ''
  },
  //GSP认证
  gsp: {
    type: String,
    default: ''
  },
  //上级客户
  superior: {
    type: String,
    default: ''
  },
  //工商注册号
  registrationNum: {
    type: String,
    default: ''
  },
  //客户分类
  category: {
    type: String,
    default: ''
  },
  //备注
  memo: {
    type: String,
    default: ''
  },
  //地址
  location: {
    type: String,
    default: ''
  }
})

let Companies = mongoose.model('companies', schema)

module.exports = Companies
