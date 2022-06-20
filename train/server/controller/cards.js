let Cards = require("../model/cards")

/**
 * 添加门禁卡
 */
const add = async (ctx) => {
  let cards = ctx.request.body
  await Cards.create(cards)
    .then((rel) => {
      if (rel) {
        ctx.body = {
          code: 200,
          msg: "添加门禁卡成功"
        }
      } else {
        ctx.body = {
          code: 300,
          msg: "添加门禁卡失败"
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "添加门禁卡时出现异常",
        err
      }
    })
}

/**
 * 修改门禁卡
 */
const update = async (ctx) => {
  let cards = ctx.request.body

  await Cards.updateOne(
    { cardNum: cards.cardNum },
    {
      possessed: cards.possessed,
      faceUnlock: cards.faceUnlock
    }
  )
    .then((rel) => {
      if (rel.n > 0) {
        ctx.body = {
          code: 200,
          msg: "门禁卡更新成功"
        }
      } else {
        ctx.body = {
          code: 300,
          msg: "门禁卡更新失败"
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "门禁卡更新时出现异常",
        err
      }
    })
}

/**
 * 删除门禁卡
 */
const del = async (ctx) => {
  let { cardName } = ctx.request.body
  await Cards.findOneAndDelete({ cardName })
    .then((rel) => {
      if (rel) {
        ctx.body = {
          code: 200,
          msg: "门禁卡删除成功"
        }
      } else {
        ctx.body = {
          code: 300,
          msg: "门禁卡删除失败"
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "门禁卡删除时出现异常"
      }
    })
}

module.exports = {
  add,
  update,
  del
}
