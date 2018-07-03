const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = () => ({
  entry: `${__dirname}/docs.js`,
  output: {
    path: `${__dirname}/build/`,
    filename: 'bundle.js',
  },
  module: {
    noParse: /(mapbox-gl)\.js$/, // https://github.com/mapbox/mapbox-gl-js/issues/4359
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
