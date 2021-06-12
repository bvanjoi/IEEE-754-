const { merge } = require('webpack-merge');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const baseConfig = require('./webpack.base.js');

const prodConfig = {
  mode: 'production',
  bail: true,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [require('postcss-preset-env')()],
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [require('postcss-preset-env')()],
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'main.[contenthash:10].css',
    }),
    new CSSMinimizerWebpackPlugin(),
  ],
};

module.exports = merge(baseConfig, prodConfig);
