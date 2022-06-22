let { forEach, assignIn, get } = require("lodash")
var moment = require("moment-timezone")
let Companies = require("../model/companies")
let Compacts = require("../model/compacts")
let Staffs = require("../model/staffs")
let Card = require("../model/cards")

const findAllCom = async (ctx) => {
  let { idInput, level, beginTimeInput } = ctx.query

  let matchId = {}
  let matchLevel = {}
  let matchBeginTime = {}
  if (idInput) {
    matchId.id = Number(idInput)
  }
  if (level) {
    matchLevel.level = level
  }
  if (beginTimeInput) {
    matchBeginTime = {
      "compactCom.beginTime": {
        $gte: new Date(beginTimeInput)
      }
    }
  }
  await Companies.aggregate([
    {
      $lookup: {
        from: "compacts",
        localField: "id",
        foreignField: "comId",
        as: "compactCom"
      }
    },
    {
      $match: matchId
    },
    {
      $match: matchLevel
    },
    {
      $match: matchBeginTime
    }
  ]).then((rel) => {
    ctx.body = {
      code: 200,
      date: rel
    }
  })
}

const findAllStaff = async (ctx) => {
  let { stringInput, level, stetusInput } = ctx.query
  let str = ".*" + stringInput + ".*$"
  let reg = new RegExp(str)
  let matchString = {}
  let matchLevel = {}
  let matchStetus = {}
  if (level) {
    matchLevel = { levels: { $elemMatch: { $eq: level } } }
  }
  if (stringInput) {
    matchString = {
      $or: [
        { name: { $regex: reg } },
        { callNum: { $regex: reg } },
        { certNum: { $regex: reg } },
        { comName: { $regex: reg } }
      ]
    }
  }
  let stetusInputBool = true
  if (stetusInput === "false") {
    stetusInputBool = false
  }
  if (stetusInput) {
    matchStetus = { "cardPart.possessed": stetusInputBool }
  }
  await Staffs.aggregate([
    {
      $lookup: {
        from: "companies",
        localField: "comName",
        foreignField: "name",
        as: "comPart"
      }
    },
    {
      $lookup: {
        from: "cards",
        localField: "name",
        foreignField: "username",
        as: "cardPart"
      }
    },
    {
      $match: matchString
    },
    {
      $match: matchLevel
    },
    {
      $match: matchStetus
    }
  ]).then((rel) => {
    ctx.body = {
      code: 200,
      date: rel
    }
  })
}
module.exports = {
  findAllStaff,
  findAllCom
}
