const path = require('path');

module.exports = {
  entry: './src/game.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
