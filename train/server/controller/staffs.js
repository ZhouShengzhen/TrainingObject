let Staffs = require("../model/staffs")

/**
 * 添加员工
 */
const add = async (ctx) => {
  let staffs = ctx.request.body
  await Staffs.create(staffs)
    .then((rel) => {
      if (rel) {
        ctx.body = {
          code: 200,
          msg: "添加员工成功"
        }
      } else {
        ctx.body = {
          code: 300,
          msg: "添加员工失败"
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "添加员工时出现异常",
        err
      }
    })
}

/**
 * 查询所有员工(根据公司)
 */
const findAll = async (ctx) => {
  let { comName } = ctx.query
  await Staffs.find({ comName })
    .then((rel) => {
      if (rel) {
        ctx.body = {
          code: 200,
          msg: "员工查询成功",
          result: rel
        }
      } else {
        ctx.body = {
          code: 300,
          msg: "员工查询失败"
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "员工查询时出现异常",
        err
      }
    })
}

/**
 * 查询单个员工(根据姓名)
 */
const findOne = async (ctx) => {
  let { name } = ctx.query
  await Staffs.find({ name })
    .then((rel) => {
      if (rel) {
        ctx.body = {
          code: 200,
          msg: "员工查询成功",
          result: rel
        }
      } else {
        ctx.body = {
          code: 300,
          msg: "员工查询失败"
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "员工查询时出现异常",
        err
      }
    })
}

module.exports = {
  add,
  findAll,
  findOne
}
