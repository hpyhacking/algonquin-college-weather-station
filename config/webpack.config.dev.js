const path = require('path');
const webpack = require("webpack")

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '..', 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: ['style-loader','css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    static: './dist'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};


