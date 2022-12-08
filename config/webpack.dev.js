const { merge } = require('webpack-merge')
const base = require('./_webpack.js')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist'
  },
});
