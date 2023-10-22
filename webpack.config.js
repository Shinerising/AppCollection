import { GenerateSW } from 'workbox-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

export default {
  entry: "./index.ts",
  plugins: [
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://github-api.awayne.me/(.*)'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'api-request',
            broadcastUpdate: {
              channelName: 'api-request-update',
              options: {
                headersToCheck: ['Content-Type', 'Content-Length'],
              },
            },
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 24 * 60 * 60
            },
          },
        }
      ]
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