const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/client/index.html',
  filename: 'index.html',
  inject: 'body'
})

console.log(require.resolve('sass-loader'))
module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      { test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { 
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react'],
              plugins: ['transform-class-properties', 'transform-decorators-legacy']
            }
          }
        ],
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react'],
              plugins: ['transform-class-properties', 'transform-decorators-legacy']
            }
          }
        ],
      },{
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
        }, {
            loader: "sass-loader" // compiles Sass to CSS
            // options: {}
        }]
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}  
          }
        ]
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}