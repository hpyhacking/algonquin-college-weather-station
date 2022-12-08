const { merge } = require('webpack-merge')
const base = require('./_webpack.js')
const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(base, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '..', 'docs'),
    filename: 'app.js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "*.html",
          to: path.resolve(__dirname, '..', 'docs'),
          context: path.resolve(__dirname, '..', 'dist'),
        },
        {
          from: "favicon*",
          to: path.resolve(__dirname, '..', 'docs'),
          context: path.resolve(__dirname, '..', 'dist'),
        }
      ],
    })
  ]
});
