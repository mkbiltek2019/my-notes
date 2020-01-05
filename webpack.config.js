const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const env = process.env.NODE_ENV;

module.exports = {
  entry: {
    notes: "./src/notes/index.js",
    options: "./src/options/index.js",
  },
  output: {
    path: path.resolve(__dirname, "./bin"),
    filename: "[name].js",
  },
  plugins: [
    new CopyPlugin([
      { from: "static" },
    ]),
  ],
  devtool: (env === "development" ? "source-map" : "none"),
};
