const express = require('express')
const path = require('path')
const webpack = require('webpack')
const fs = require('fs')

// 参考文档:
// https://juejin.im/post/6844903791611871239

// TODO: 以下涉及到热更新的代码需要判断环境，例如在生产环境下 webpack-dev-middleware 并不存在
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('../webpack/webpack.dev')
const compiler = webpack(config)
const template = require('./template')

const app = express()

const sleep = (seconds) => {
  return new Promise(resove => {
    setTimeout(() => {
      resove()
    }, seconds * 1000)
  })
}

function bufferSplit (buffer, separator) {
  let result = []
  let index = 0

  while ((index = buffer.indexOf(separator)) !== -1) {
    result.push(buffer.slice(0, index))
    buffer = buffer.slice(index + separator.length)
  }
  result.push(buffer)

  return result
}

app.post('/upload', async (req, res) => {
  const boundary = `--${req.headers['content-type'].split('; ')[1].split('=')[1]}` // 获取分隔符
  let arr = []
  req.on('data', (buffer) => {
    arr.push(buffer)
  })

  req.on('end', () => {
    const buffer = Buffer.concat(arr)
    console.log('==========================')
    console.log(buffer.toString())
    console.log('==========================')

    // 1. 用<分隔符>切分数据
    let result = bufferSplit(buffer, boundary)

    // 2. 删除数组头尾数据
    result.pop()
    result.shift()

    // 3. 将每一项数据头尾的的\r\n删除
    result = result.map(item => item.slice(2, item.length - 2))

    // 4. 将每一项数据中间的\r\n\r\n删除，得到最终结果
    result.forEach(item => {
      let [info, data] = bufferSplit(item, '\r\n\r\n') // 数据中含有文件信息，保持为Buffer类型
      info = info.toString() // info为字段信息，这是字符串类型数据，直接转换成字符串，若为文件信息，则数据中含有一个回车符\r\n，可以据此判断数据为文件还是为普通数据。

      if (info.indexOf('\r\n') >= 0) { // 若为文件信息，则将Buffer转为文件保存
        // 获取字段名
        let infoResult = info.split('\r\n')[0].split('; ')
        let name = infoResult[1].split('=')[1]
        name = name.substring(1, name.length - 1)

        // 获取文件名
        let filename = infoResult[2].split('=')[1]
        filename = filename.substring(1, filename.length - 1)
        console.log(name)
        console.log(filename)

        // 将文件存储到服务器
        fs.writeFile(`./${filename}`, data, err => {
          if (err) {
            res.send('error')
          } else {
            res.send('success')
          }
        })
      } else { // 若为数据，则直接获取字段名称和值
        let name = info.split('; ')[1].split('=')[1]
        name = name.substring(1, name.length - 1)
        const value = data.toString()
        console.log(name, value)
      }
    })
  })
})

app.get('/json', async (req, res) => {
  let i = 1
  const t = setInterval(() => {
    console.log('正在处理', i++)
  }, 200)
  await sleep(2)
  clearInterval(t)
  res.send({
    a: 1
  })
})

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
