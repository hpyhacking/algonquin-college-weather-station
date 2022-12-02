const path = require('path');
const webpack = require("webpack")

const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'app.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "app.css"
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)/,
        type: 'asset/resource'
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  ignoreWarnings: [
    {
      message: /fontawesome-free/
    }
  ],
  devServer: {
    static: './dist'
  }
};


