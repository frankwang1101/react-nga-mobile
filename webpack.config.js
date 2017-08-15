var path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: ['./src/index.tsx'],
    vendor: ['react','react-dom','redux']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),

    chunkFilename: '[name]-[id].[chunkhash:8].bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: '.',
    hot: true,
    host: '127.0.0.1',
    port: 3000
  },
  module: {
    rules: [
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.less$/,
        loader: [
          'style-loader', 'css-loader', 'less-loader'
        ]
      }, {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: ['awesome-typescript-loader']
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: [
          'babel-loader'
        ]
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    new webpack.HotModuleReplacementPlugin()
  ]
}