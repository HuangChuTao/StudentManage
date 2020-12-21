/**
 * app.js入口文件模块
 * 职责：
 * 创建服务
 * 做配置
 *   模板引擎
 *   body-parser：解析表单post请求体数据
 *   提供静态资源服务（开放文件）
 * 挂载路由
 * 监听端口启动服务器
 */

let express = require('express');
let router = require('./router.js');
let bodyParser = require('body-parser')

let app = express();

//公开资源
app.use('/public/', express.static('./public'));
app.use('/node_modules/', express.static('./node_modules'));

//配置art-templata
app.engine('html', require('express-art-template'));

//配置post请求体数据
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(router)

app.listen(3000, () => {
  console.log('服务器启动成功');
})