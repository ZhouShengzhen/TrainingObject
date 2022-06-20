let { forEach, assignIn, get } = require("lodash")
var moment = require("moment-timezone")
let Companies = require("../model/companies")
let Compacts = require("../model/compacts")
let Staffs = require("../model/staffs")
let Card = require("../model/cards")

/**
 * 使用异步请求方式实现
 * 直接失败
 */

// const findAll = async (ctx) => {
//   console.log("findBefore")
//   let lines = []
//   let line = null
//   let companiesObjs = await Companies.find()
//   console.log(companiesObjs)
//   forEach(companiesObjs, async (value) => {
//     console.log("forEachBefore")
//     const companyPart = {
//       comId: get(value, "id", ""),
//       comName: get(value, "name", ""),
//       callNum: get(value, "callNum", ""),
//       callName: get(value, "callName", ""),
//       business: get(value, "business", ""),
//       status: get(value, "status", "")
//     }
//     let rel = await Compacts.findOne({ comId: value.id })
//     console.log(rel)
//     console.log("findOne")
//     const compactPart = {
//       level: get(rel, "level", ""),
//       doorNum: get(rel, "doorNum", ""),
//       beginTime: get(rel, "beginTime", ""),
//       endTime: get(rel, "endTime", "")
//     }
//     // let temp = null
//     // Compacts.findOne({ comId: value.id }).then((rel) => {
//     //   console.log(rel)
//     //   console.log("findOne")
//     //   temp = rel
//     // })
//     // const compactPart = {
//     //   level: get(temp, "level", ""),
//     //   doorNum: get(temp, "doorNum", ""),
//     //   beginTime: get(temp, "beginTime", ""),
//     //   endTime: get(temp, "endTime", "")
//     // }
//     line = assignIn(companyPart, compactPart)
//     lines.push(line)
//     console.log("forEachAfter")
//     // console.log(line)
//   })
//   console.log("findAfter")
//   // console.log(line)
//   ctx.body = {
//     code: 200,
//     date: lines
//   }
// }

const findAllCom = async (ctx) => {
  let { idInput, level, beginTimeInput } = ctx.query
  console.log(idInput)
  console.log(beginTimeInput)
  // let a = moment(beginTimeInput).tz("Asia/Shanghai").format()
  // a = moment(beginTimeInput)
  // console.log(moment.tz.names())

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
  console.log(matchId)
  console.log(matchLevel)
  console.log(matchBeginTime)
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

// const findAllCom = async (ctx) => {
//   let { idInput, level } = ctx.query
//   const matchId = {}
//   const matchLevel = {}
//   if (idInput) {
//     matchId.id = Number(idInput)
//   }
//   if (level) {
//     matchLevel.level = level
//   }
//   await Companies.aggregate([
//     {
//       $lookup: {
//         from: "compacts",
//         localField: "id",
//         foreignField: "comId",
//         as: "compactCom"
//       }
//     },
//     {
//       $match: matchId
//     },
//     {
//       $match: matchLevel
//     }
//   ]).then((rel) => {
//     ctx.body = {
//       code: 200,
//       date: rel
//     }
//   })
// }

const findAllStaff = async (ctx) => {
  let { stringInput, level, stetusInput } = ctx.query
  let str = ".*" + stringInput + ".*$"
  let reg = new RegExp(str)
  console.log(stringInput)
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
