const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env }) => {
      if (env === 'production') {
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          maxInitialRequests: 25,
          maxAsyncRequests: 25,
          minSize: 20000,
          maxSize: 450000,
          cacheGroups: {
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|react-redux)[\\/]/,
              name: 'vendor.react',
              priority: 30,
              enforce: true,
            },
            aws: {
              test: /[\\/]node_modules[\\/]@aws-sdk[\\/]/,
              name: 'vendor.aws',
              priority: 25,
              enforce: true,
            },
            pdf: {
              test: /[\\/]node_modules[\\/]pdfjs-dist[\\/]/,
              name: 'vendor.pdf',
              priority: 25,
              enforce: true,
            },
            document: {
              test: /[\\/]node_modules[\\/](mammoth|mhtml2html|jszip|adm-zip|fflate|js-untar)[\\/]/,
              name: 'vendor.document',
              priority: 20,
              enforce: true,
            },
            media: {
              test: /[\\/]node_modules[\\/](howler|hammerjs|marked|dompurify)[\\/]/,
              name: 'vendor.media',
              priority: 20,
              enforce: true,
            },
            storage: {
              test: /[\\/]node_modules[\\/](better-sqlite3|localforage|electron-store|megajs|basic-ftp|ssh2-sftp-client|webdav)[\\/]/,
              name: 'vendor.storage',
              priority: 20,
              enforce: true,
            },
            http: {
              test: /[\\/]node_modules[\\/](axios|sse\.js|node-fetch|form-data)[\\/]/,
              name: 'vendor.http',
              priority: 18,
              enforce: true,
            },
            ui: {
              test: /[\\/]node_modules[\\/](react-sortablejs|react-dropzone|react-lottie|react-hot-toast|react-tooltip|react-device-detect|rc-color-picker|html-react-parser|sortablejs)[\\/]/,
              name: 'vendor.ui',
              priority: 18,
              enforce: true,
            },
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor',
              priority: 10,
              minChunks: 1,
            },
            common: {
              name: 'common',
              minChunks: 2,
              priority: 5,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        };
      }

      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        alias: {
          ...webpackConfig.resolve.alias,
          '@': path.resolve(__dirname, 'src'),
        },
      };

      return webpackConfig;
    },
  },
};
