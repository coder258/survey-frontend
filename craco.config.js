const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  devServer: {
    port: 8000,
    // proxy: {
    //   '/api': 'http://localhost:3001'
    // }
  },
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
          @import "src/styles/_variables.scss";
          @import "src/styles/_mixins.scss";
          @import "src/styles/_global.scss";
          @import "src/styles/utilities/_generators.scss";
        `,
      },
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      // 解决绝对路径问题
      webpackConfig.resolve.modules = [
        path.resolve(__dirname, 'src'),
        'node_modules',
      ];

      if (webpackConfig.mode === 'production') {
        if (webpackConfig.optimization === null) {
          webpackConfig.optimization = {};
        }

        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            antd: {
              name: 'antd-chunk',
              test: /antd/,
              priority: 100
            },
            reactDom: {
              name: 'reactDom-chunk',
              test: /react-dom/,
              priority: 99
            },
            venders: {
              name: 'vendors-chunk',
              test: /node_modules/,
              priority: 98
            }
          }
        };
      }

      return webpackConfig;
    },
    plugins: [
      new BundleAnalyzerPlugin()
    ]
  },
};
