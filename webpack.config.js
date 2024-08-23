/*
cd "C:\Users\johnd\Documents\Github/MoodleBot"
npx webpack
*/

const path = require('path');

module.exports = [
  {
  entry: './scripts/review.js', // Path to your main content script
  output: {
    filename: 'review.js', // The bundled output file
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  mode: 'production',
},
{
  entry: './scripts/view.js', // Path to your main content script
  output: {
    filename: 'view.js', // The bundled output file
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  mode: 'production',
},
{
  entry: './scripts/attempt.js', // Path to your main content script
  output: {
    filename: 'attempt.js', // The bundled output file
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  mode: 'production',
}
];