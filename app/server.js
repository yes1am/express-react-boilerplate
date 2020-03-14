const express = require('express')
const path = require('path')
const webpack = require('webpack')

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

// 静态资源
app.use('/static', express.static(path.resolve(__dirname, './static')))

// 前端资源
app.use('/assets', express.static(path.resolve(__dirname, '../dist/assets')))

// 设置为 * ,保证刷新能进入前端路由
app.all('*', function (req, res) {
  res.send(template.index())
})

app.listen(3004, '0.0.0.0', function () {
  console.log(`
===================================
Example app listening on port 3004!
===================================`)
})
