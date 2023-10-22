import CopyPlugin from 'copy-webpack-plugin';

export default {
  mode: 'development',
  entry: "./index.ts",
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "assets", to: "" }
      ],
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/i,
        loader: "ts-loader"
      }]
  },
  resolve: { extensions: [".ts", ".js"] },
};