const DB = require('../utils/db.js')

module.exports = {

  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let product = ctx.request.body

    let list = await DB.query('SELECT * FROM trolley_user WHERE trolley_user.id = ? AND trolley_user.user = ?', [product.id, user])
    if (!list.length) {
      // 商品还未添加到购物车
      await DB.query('INSERT INTO trolley_user(id, count, user) VALUES (?, ?, ?)', [product.id, 1, user])
    } else {
      // 商品之前已经添加到购物车
      let count = list[0].count + 1
      await DB.query('UPDATE trolley_user SET count = ? WHERE trolley_user.id = ? AND trolley_user.user = ?', [count, product.id, user])
    }

    ctx.state.data = {}
  }
}