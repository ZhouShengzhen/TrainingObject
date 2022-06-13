let Companies = require('../model/companies')

/**
 * 添加租户
 */
const add = async (ctx) => {
  let companies = ctx.request.body
  await Companies.create(companies)
    .then((rel) => {
      if (rel) {
        ctx.body = {
          code: 200,
          msg: '添加租户成功'
        }
      } else {
        ctx.body = {
          code: 300,
          msg: '添加租户失败'
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: '添加租户时出现异常',
        err
      }
    })
}

/**
 * 查询所有租户（分页）
 */
const findAll = async (ctx) => {
  let { page, level } = ctx.query

  //判断页码
  if (!page || isNaN(Number(page))) {
    page = 1
  } else {
    page = Number(page)
  }

  //每页条数
  let pageSize = 10

  //计算总页数
  let count = 0
  await Companies.find({ level })
    .count()
    .then((rel) => {
      count = rel
    })
  let totalPage = 0
  if (count > 0) {
    totalPage = Math.ceil(count / pageSize)
  }

  //判断当前页码的范围
  if (totalPage > 0 && page > totalPage) {
    page = totalPage
  } else if (page < 1) {
    page = 1
  }

  //计算起始位置
  let start = (page - 1) / pageSize

  await Companies.find({ level })
    .skip(start)
    .limit(pageSize)
    .then((rel) => {
      if (rel && rel.length > 0) {
        ctx.body = {
          code: 200,
          msg: '租户查询成功',
          result: rel,
          page,
          pageSize,
          count
        }
      } else {
        ctx.body = {
          code: 300,
          msg: '没有查询到租户'
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: '租户查询时出现异常',
        err
      }
    })
}

/**
 * 查询单个文章
 */
const findOne = async (ctx) => {
  let { id } = ctx.query
  let isRead = false
  await Companies.findOne({ id })
    .then((rel) => {
      if (rel) {
        isRead = true
        ctx.body = {
          code: 200,
          msg: '租户查询成功',
          result: rel
        }
      } else {
        ctx.body = {
          code: 300,
          msg: '租户查询失败'
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: '租户查询时出现异常',
        err
      }
    })

  if (isRead) {
    await Companies.updateOne({ id }, { $inc: { read: 1 } })
  }
}

/**
 * 修改文章
 */
const update = async (ctx) => {
  let Companies = ctx.request.body

  await Companies.updateOne(
    { id: Companies.id },
    {
      level: Companies.level,
      doorNum: Companies.doorNum,
      business: Companies.business,
      status: Companies.status,
      callNum: Companies.callNum,
      callName: Companies.callName,
      nameShort: Companies.nameShort,
      nameEn: Companies.nameEn,
      taxNum: Companies.taxNum,
      barCode: Companies.barCode,
      charater: Companies.charater,
      legalPer: Companies.legalPer,
      license: Companies.license,
      taxPayer: Companies.taxPayer,
      gsp: Companies.gsp,
      superior: Companies.superior,
      registrationNum: Companies.registrationNum,
      category: Companies.category,
      memo: Companies.memo,
      location: Companies.location
    }
  )
    .then((rel) => {
      if (rel.n > 0) {
        ctx.body = {
          code: 200,
          msg: '租户更新成功'
        }
      } else {
        ctx.body = {
          code: 300,
          msg: '租户更新失败'
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: '租户更新时出现异常',
        err
      }
    })
}

/**
 * 删除文章
 */
const del = async (ctx) => {
  let { id } = ctx.request.body
  await Companies.findOneAndDelete({ id })
    .then((rel) => {
      if (rel) {
        ctx.body = {
          code: 200,
          msg: '文章删除成功'
        }
      } else {
        ctx.body = {
          code: 300,
          msg: '文章删除失败'
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: '文章删除时出现异常'
      }
    })
}

module.exports = {
  add,
  findAll,
  findOne,
  update,
  del
}
