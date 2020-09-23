const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './public/src/game.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './public/dist'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './public/assets', to: './assets' },
      ],
    }),
  ],
};
