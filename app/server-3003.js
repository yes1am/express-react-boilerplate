const express = require('express')
const path = require('path')
const webpack = require('webpack')
const cookieParser = require('cookie-parser')

// TODO: 以下涉及到热更新的代码需要判断环境，例如在生产环境下 webpack-dev-middleware 并不存在
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('../webpack/webpack.dev')
const compiler = webpack(config)
const template = require('./template')

const app = express()

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  lazy: false,
  stats: {
    colors: true
  }
}))

// Add hot middleware support, Check [HMR] connected in console
app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr'
}))

app.use(cookieParser())

// 静态资源
app.use('/static', express.static(path.resolve(__dirname, './static')))

// 前端资源
app.use('/assets', express.static(path.resolve(__dirname, '../dist/assets')))

// 设置为 * ,保证刷新能进入前端路由
app.all('*', function (req, res) {
  // console.log(req.path, '@@@')
  // if (req.path === '/favicon.ico') {
  //   console.log('xx')
  // }
  var cookie = req.cookies.cookieName
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Method', '*')
  if (cookie === undefined) {
    res.cookie('cookieName', '3003', { expires: new Date(Date.now() + 1000 * 10 * 60) })
    console.log('cookie created successfully, ###########')
  } else {
    // yes, cookie was already present
    console.log('cookie exists, @@@@@@@@@@@@', cookie)
  }
  // res.send('<h1>3003</h1>')
  res.send(template.index())
})

app.listen(3003, '0.0.0.0', function () {
  console.log(`
===================================
Example app listening on port 3003!
===================================`)
})
