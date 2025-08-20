const path = require('path');

module.exports = {
  devServer: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
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
      
      return webpackConfig;
    }
  }
};
