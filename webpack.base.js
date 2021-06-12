const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const voageConfig = require('./voage.config');

const baseConfig = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash:8].js',
  },
  resolve: {
    extensions: ['.tsx', 'jsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
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
          'style-loader',
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
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: voageConfig.asset.maxInlineAssetSize,
          },
        },
        generator: {
          filename: 'fonts/[name]_[hash:8].[ext]',
        },
      },
      {
        test: /\.mdx?$/,
        use: ['babel-loader', '@mdx-js/loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: 'auto',
      inject: 'body',
      scriptLoading: 'blocking',
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
};

module.exports = baseConfig;
