let { forEach, assignIn, get } = require("lodash")

let Companies = require("../model/companies")
let Compacts = require("../model/compacts")

const findAll = async (ctx) => {
  console.log("findBefore")
  let lines = []
  let line = null
  let companiesObjs = await Companies.find()

  forEach(companiesObjs, (value) => {
    console.log("forEachBefore")
    const companyPart = {
      comId: get(value, "id", ""),
      comName: get(value, "name", ""),
      callNum: get(value, "callNum", ""),
      callName: get(value, "callName", ""),
      business: get(value, "business", ""),
      status: get(value, "status", "")
    }
    // let rel = Compacts.findOne({ comId: value.id })
    // console.log(rel)
    // console.log("findOne")
    // const compactPart = {
    //   level: get(rel, "level", ""),
    //   doorNum: get(rel, "doorNum", ""),
    //   beginTime: get(rel, "beginTime", ""),
    //   endTime: get(rel, "endTime", "")
    // }
    let temp = null
    Compacts.findOne({ comId: value.id }).then((rel) => {
      console.log(rel)
      console.log("findOne")
      temp = rel
    })
    const compactPart = {
      level: get(temp, "level", ""),
      doorNum: get(temp, "doorNum", ""),
      beginTime: get(temp, "beginTime", ""),
      endTime: get(temp, "endTime", "")
    }
    line = assignIn(companyPart, compactPart)
    lines.push(line)
    console.log("forEachAfter")
    // console.log(line)
  })
  console.log("findAfter")
  // console.log(line)
  ctx.body = {
    code: 200,
    date: lines
  }
}

module.exports = {
  findAll
}
