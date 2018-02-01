const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = () => ({
  entry: `${__dirname}/docs.js`,
  output: {
    path: `${__dirname}/build/`,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, use: ExtractTextPlugin.extract(['css-loader']) },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true,
    }),
  ],
});
