/* eslint-disable indent */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

  entry: './src/app.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },

  devtool: 'source-map',

  module: {
    rules: [{
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.json$/,
        loader: 'file-loader',
        type: 'javascript/auto',
        options: {
          name() {
            return '[name].[ext]';
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },

      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: false,
          },
        }],
      },

      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              disable: true,
            },
          },
        ],
      },

      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: './fonts/[name].[ext]',
          },
        }],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin(),
  ],

  devServer: {
    compress: true,
    port: 3005,
  },
};
