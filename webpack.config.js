const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackMerge = require('webpack-merge');
const getModeConfig = env =>
  require(`./build-utils/${env.mode}.config.js`)(env);

module.exports = env =>
  webpackMerge(
    {
      mode: env.mode,
      context: path.resolve(__dirname, 'src'),
      entry: './js/main.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
          },
          {
            test: /\.pug$/,
            use: ['pug-loader'],
          },
          {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[path]/[name].[ext]',
                },
              },
            ],
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[path]/[name].[ext]',
                },
              },
            ],
          },
        ],
      },
      plugins: [new CleanWebpackPlugin()],
    },
    getModeConfig(env),
  );
