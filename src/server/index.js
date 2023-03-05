
// 引入express
const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const router = require('./router')
const port = process.argv[2] || config.port
const app = express()
const static = require('serve-static');

app.all('*', (req, res, next) => {
    //代理服务器允许跨域
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type,token");
  //res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("X-Powered-By",' pdf-server');
  next();
})

//设置body限制
app.use(bodyParser.json({
  limit: config.limit
}))

//设置body限制
app.use(bodyParser.urlencoded({
  limit: config.limit,
  extended: true
}))

//注册后端路由
app.use('/', router)

// 设置静态资源访问路径
config.staticDirs.forEach(function(staticDir){
  app.use(staticDir, static(__dirname + staticDir));
});

app.listen(port, () => {
  const date = new Date()
  console.log(" \033[42;30m 时间：" + date.toLocaleDateString() + ' ' + date.toLocaleTimeString() + ' \033[0m');
  console.log(' \033[42;30m 描述：JS-compiler项目服务端已开启，地址：http://localhost:' + port + ' \033[0m');
})







