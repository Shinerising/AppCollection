import { GenerateSW } from 'workbox-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

export default {
  entry: "./index.ts",
  plugins: [
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    }),
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