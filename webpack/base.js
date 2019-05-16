const path = require('path')
const webpack = require('webpack')

const generateConfig = (dev) => {
  const plugins = []
  if (dev) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin()
    )
  }
  return {
    resolve: {
      extensions: ['.js', '*', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, '../app/views'),
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.(less|css)$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'less-loader', options: { javascriptEnabled: true } }
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: {
            loader: 'url-loader?limit=8192'
          }
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2$)$/,
          use: {
            loader: 'file-loader'
          }
        }
      ]
    },
    plugins
  }
}

module.exports = {
  pro: generateConfig(),
  dev: generateConfig(true)
}
