const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const env = process.env.NODE_ENV;

module.exports = {
  entry: {
    notes: "./src/notes/index.js",
    options: "./src/options/index.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  output: {
    path: path.resolve(__dirname, "./bin"),
    filename: "[name].js",
    chunkFilename: "[name].js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new CopyPlugin([
      { from: "static" },
    ]),
  ],
  devtool: (env === "development" ? "source-map" : "none"),
};
