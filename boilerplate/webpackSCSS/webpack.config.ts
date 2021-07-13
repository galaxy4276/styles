import { Configuration } from 'webpack';
import { join } from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import 'webpack-dev-server';

type DevServer = {
  devServer: {
    contentBase: string;
    compress: boolean;
    port: number;
    hot: boolean;
  }
};

const config: Configuration & DevServer = {
  mode: 'development',
  entry: join(__dirname, './index.html'),
  output: {
    path: join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            preset: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: './styles.css',
    }),
  ],
  devServer: {
    contentBase: join(__dirname, 'dist'),
    port: 3000,
    compress: true,
    hot: true,
  },
};

export default config;
