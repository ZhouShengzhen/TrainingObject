let Compacts = require('../model/compacts')

/**
 * 添加合同
 */
const add = async (ctx) => {
  let compacts = ctx.request.body
  await Compacts.create(compacts)
    .then((rel) => {
      if (rel) {
        ctx.body = {
          code: 200,
          msg: '添加合同成功'
        }
      } else {
        ctx.body = {
          code: 300,
          msg: '添加合同失败'
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: '添加合同时出现异常',
        err
      }
    })
}

/**
 * 查询单个合同(根据合同id)
 */
const findOne = async (ctx) => {
  let { comId } = ctx.query
  await Compacts.findOne({ comId })
    .then((rel) => {
      if (rel) {
        isRead = true
        ctx.body = {
          code: 200,
          msg: '合同查询成功',
          result: rel
        }
      } else {
        ctx.body = {
          code: 300,
          msg: '合同查询失败'
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: '合同查询时出现异常',
        err
      }
    })
}

module.exports = {
  add,
  findOne
}
