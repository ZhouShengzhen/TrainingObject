let { forEach, assignIn, get } = require("lodash")
var moment = require("moment-timezone")
let Companies = require("../model/companies")
let Compacts = require("../model/compacts")

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

// const findAll = async (ctx) => {
//   console.log("findBefore")
//   await Companies.aggregate([
//     {
//       $lookup: {
//         from: "compacts",
//         localField: "id",
//         foreignField: "comId",
//         as: "compactCom"
//       }
//     }
//   ]).then((rel) => {
//     ctx.body = {
//       code: 200,
//       date: rel
//     }
//   })
// }

// let matchId = {
//   enable: true,
//   id: null
// }

// const findAll = async (ctx) => {
//   let { idInput, level, beginTimeInput } = ctx.query
//   console.log(idInput)
//   console.log(beginTimeInput)
//   // let a = moment(beginTimeInput).tz("Asia/Shanghai").format()
//   // a = moment(beginTimeInput)
//   // console.log(moment.tz.names())

//   const matchId = {}
//   const matchLevel = {}
//   const matchBeginTime = {}
//   if (idInput) {
//     matchId.id = Number(idInput)
//   }
//   if (level) {
//     matchLevel.level = level
//   }
//   if (beginTimeInput) {
//     matchBeginTime.compactCom = {
//       $elemMatch: {
//         // $gte: new Date(beginTimeInput)
//         $gte: new Date(moment(beginTimeInput).tz("Asia/Shanghai").format())
//       }
//     }
//   }
//   console.log(matchId)
//   console.log(matchLevel)
//   console.log(matchBeginTime)
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
//     },
//     {
//       $match: matchBeginTime
//     }
//   ]).then((rel) => {
//     ctx.body = {
//       code: 200,
//       date: rel
//     }
//   })
// }

const findAll = async (ctx) => {
  let { idInput, level } = ctx.query
  const matchId = {}
  const matchLevel = {}
  if (idInput) {
    matchId.id = Number(idInput)
  }
  if (level) {
    matchLevel.level = level
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
    }
  ]).then((rel) => {
    ctx.body = {
      code: 200,
      date: rel
    }
  })
}

module.exports = {
  findAll
}
