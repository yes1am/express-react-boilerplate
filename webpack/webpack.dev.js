const path = require('path')
const baseConfig = require('./base')

module.exports = Object.assign({
  mode: 'development',
  entry: {
    app: ['./app/views/index.js', 'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true']
  },
  output: {
    path: path.resolve(__dirname, '../dist/assets'),
    publicPath: '/assets',
    filename: '[name].js'
  }
}, baseConfig.dev)
