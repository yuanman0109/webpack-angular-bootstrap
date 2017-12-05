var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var prod = process.env.NODE_ENV === 'production' ? true : false;
var isDevelopment = process.env.NODE_ENV === 'development' ? true : false;
var isBulidTest = process.env.NODE_ENV === 'bulidTest' ? true : false;
var version = "2.4.0";
var faqLocalUrl = 'http://10.15.115.39:8089';
var faq14Url = 'http://10.10.1.14:81';
var isfor14 = process.env.NODE_ENV === 'bulid14' ? true : false;
const extractSass = new ExtractTextPlugin({
  filename: "css/[name].[contenthash].css"
  //disable: process.env.NODE_ENV === "development"
});


var webpackConfig = {
  entry: {
    index: ["babel-polyfill", 'app/index.js'],
    mobileCharts: ['app/mobileCharts.js'],
    vendor: ['angular', 'angular-animate', 'angular-ui-router', 'angular-ui-bootstrap', 'ui-select', 'oclazyload']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: "/",
    filename: "js/[name].[hash].js",
    chunkFilename: "js/[name].[hash].js",
  },
  performance: {
    hints: "warning", // enum
    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: function (assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  target: "web",
  stats: "errors-only",
  context: __dirname,
  module: {
    rules: [{
      test: /\.less$/,
      use: extractSass.extract({
        use: [{
          loader: "css-loader",
          options: {
            sourceMap: true,
            minimize: prod
          }
        }, {
          loader: "less-loader",
          options: {
            sourceMap: true
          }
        }],
        // use style-loader in development
        fallback: "style-loader"
      })
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
            minimize: prod
          }
        }
      ]
    }, {
      test: /\.js?$/,
      include: [
        path.resolve(__dirname, "app")
      ],
      enforce: "pre",
      enforce: "post",
      loader: "babel-loader",
      options: {
        presets: ["es2015"]
      }
    },
    //{ test: /\.jpg$/, use: ["file-loader"] },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      // test: /\.png|\.jpg|woff|woff2|ttf|eot|svg|swf$/,
      use: [{
        loader: 'url-loader',
        options: {
          // mimetype: "image/png",
          limit: 8192,
          name: 'images/[name].[hash:8].[ext]'
        }
      }]
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'fonts/[name].[hash:8].[ext]'
      }
    },
    {
      test: /\.(htm|html)$/i,
      use: [{
        loader: 'html-withimg-loader'        
      }],
    },
    {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true
        //  attrs: [':src']
        }
      }],
    }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.less'],
    modules: [
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    alias: {
      node_modules: __dirname + '/node_modules',
      app: __dirname + '/app',
      style: __dirname + '/app/style',
      pages: __dirname + '/app/pages',
      common: __dirname + '/app/common'
    }
  },
  devServer: {   
    disableHostCheck: true,
    //contentBase: path.join(__dirname, 'dist'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true ,// only errors & warns on hot reload      
    //本地代理
    proxy: {
      //测试服地址
      "/api": {
        target: "http://10.10.1.14",
        changeOrigin: true
        // pathRewrite: {
        //   "^/api": ""
        // }
      },
      "/local": {
        target: "http://10.15.96.156:8088",
        pathRewrite: {
          "^/local": ""
        }
      },
      //登录接口地址
      "/sso": {
        target: "http://10.10.1.14"
        /*pathRewrite: {
          "^/sso": ""
        }*/
      },
      // // 忘记密码调试url
      // '/forgetPwdUrl': {
      //   target: 'http://10.15.96.156:8085',
      //   pathRewrite: {
      //     "^/forgetPwdUrl": ""
      //   }
      // }
    }
  },
  plugins: [
    extractSass,
    //提取公共库
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'commonVendors',
    //   chunks: ['index', 'vendor'],
    //   filename: "js/vendors.[hash].js"
    // }),
    new HtmlWebpackPlugin({
      //favicon:'./src/img/favicon.ico', //favicon路径
      filename: './index.html',
      template: './index.html',
      chunks: ['commonVendors', 'vendor', 'index'],
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true //删除空白符与换行符
      }
    }),
    new HtmlWebpackPlugin({
      filename: './mobileCharts.html',
      template: './mobileCharts.html',
      chunks: ['mobileCharts'],
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true //删除空白符与换行符
      }
    }),
    new webpack.ProvidePlugin({
      qrcode: 'qrcode-generator'
    }),
    new CopyWebpackPlugin([{
      from: 'node_modules/ckeditor',
      to: 'ckeditor'
    }], {
        ignore: [
          '.github/*',
          'samples/*',
          '*.md',
          'contents.css',
          'ckeditor.js',
          '*.json'
        ],
        copyUnmodified: true
      }),
    new CopyWebpackPlugin([{
      from: 'tpl',
      to: 'tpl'
    }]),
    new CopyWebpackPlugin([{
      from: 'tpl/ckeditor/contents.css',
      to: 'ckeditor'
    }]),
    //定义全局变量
    new webpack.DefinePlugin({
      // 生产模式为空,否则为相应的字符串
      'basicURL': JSON.stringify('/api'),
      'loginURL': JSON.stringify('/sso'),
      'localURL': JSON.stringify(prod ? '' : '/local'),
      'forgetPwdUrl': JSON.stringify(prod ? '' : '/forgetPwdUrl'),
      'isRap': !(prod || isBulidTest),
      "version": JSON.stringify(version),
      'isBulidTest': isBulidTest,
      "isfor14": isfor14,
      'isDevelopment': isDevelopment,
      'faqLocalUrl': JSON.stringify(faqLocalUrl),
      'faq14Url': JSON.stringify(faq14Url)
    })
  ],
  profile: true,
  recordsPath: path.resolve(__dirname, "build/records.json"),
  recordsInputPath: path.resolve(__dirname, "build/records.json"),
  recordsOutputPath: path.resolve(__dirname, "build/records.json")
};

if (prod || isBulidTest) {
  webpackConfig.plugins = webpackConfig.plugins.concat([
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 1000// Minimum number of characters
    }),
    //压缩
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        //supresses warnings, usually from module minification
        warnings: false,
        drop_console: true,
        drop_debugger: true
      },
      comments: false,
    })
  ]);
} else {
}
module.exports = webpackConfig;