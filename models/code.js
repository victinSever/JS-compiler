const mongoose = require('mongoose')

const db = mongoose.createConnection('mongodb://admin:123456@localhost:27017/JS-compiler?authMechanism=DEFAULT&authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) console.error("连接出错：" + err)
    else console.log("weblog数据库连接成功！")
})

//创建模型
const Users = db.model('users', {
    username: { type: String, default: '未命名用户' },
    password: { type: String, default: '' },
    phone: { type: String, default: '' },
    role: { type: String, default: 'user' },
})

//创建模型
const createUserModel = (obj) => {
    return new Users(obj).save()
}

//分页查询模型列表
const listUserModel = (page = 1, size = 10) => {   
 return Users.find({}).skip((page - 1) * size).limit(size)
}

module.exports = {
    createUserModel,
    listUserModel
}