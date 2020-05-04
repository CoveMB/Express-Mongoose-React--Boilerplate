
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { outputPath } = require('./common-paths');

const config = {
  entry : { vendor: [ 'semantic-ui-react' ] },
  output: {
    path      : outputPath,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test   : /\.jsx?$/,
        exclude: /node_modules/,
        loader : 'babel-loader'
      },
      {
        test   : /\.s?css$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use : [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: [
      '*',
      '.js',
      '.jsx'
    ],
    modules: [ 'src', 'node_modules' ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name   : 'styles',
          test   : /\.css$/,
          chunks : 'all',
          enforce: true
        },
        vendor: {
          chunks : 'initial',
          test   : 'vendor',
          name   : 'vendor',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon : 'public/favicon.ico'
    })
  ]
};

module.exports = config;
