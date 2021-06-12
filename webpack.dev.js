const path = require('path');
const { merge } = require('webpack-merge');
const portfinder = require('portfinder');
const baseConfig = require('./webpack.base.js');

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, '/dist'),
  },
};

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = 8080;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      devConfig.devServer.port = port;
    }
    resolve(merge(baseConfig, devConfig));
  });
});
