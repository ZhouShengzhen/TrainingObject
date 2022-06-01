const mongoose = require('mongoose')


// 注释掉的为模版
// const schema = new mongoose.Schema({
//     p1: String,
//     p2: String
// })

// const Obj = mongoose.model('names', schema)

const userSchema = new mongoose.Schema({
    username: String,
    pwd: String
})

const User = mongoose.model('user', userSchema)

module.exports = {
    // Obj
    User
}