const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const baseConfig = {
  entry: {
    swf: ['./src/css/swf.css', './src/js/swf.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  }
};

module.exports = [
  {
    ...baseConfig,
    name: 'normal',
    mode: 'none',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      library: {
        name: 'SWF',
        type: 'umd',
        export: 'default'
      },
      globalObject: 'this',
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: '[name].css' })
    ],
    optimization: {
      minimize: false
    }
  },
  {
    ...baseConfig,
    name: 'minified',
    mode: 'production',
    output: {
      filename: '[name].min.js',
      path: path.resolve(__dirname, 'dist'),
      library: {
        name: 'SWF',
        type: 'umd',
        export: 'default'
      },
      globalObject: 'this',
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: '[name].min.css' })
    ],
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
    }
  }
];
