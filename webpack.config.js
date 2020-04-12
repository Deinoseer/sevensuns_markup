const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const GlobImporter = require('node-sass-glob-importer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const fs = require('fs');

// env mode
const modeParam = {
  development: 'development',
  production: 'production',
};

const mode = process.env.NODE_ENV || modeParam.development;

// data
const pugData = require('./src/utils/bundleData');

function generateJadePlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map((item) => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: false,
    });
  });
}

const jadePlugins = generateJadePlugins('./src/pages');

const config = {
  context: path.resolve(__dirname, 'src'),

  optimization: {
    minimize: false
  },

  mode: mode,
  watch: !!mode.production,
  watchOptions: {
    aggregateTimeout: 1000
  },

  entry: [
    './common/main.js',
    './common/main.scss',
  ],

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './js/[name].js',
  },

  devServer: {
    //hot: true,
    inline: true,
    progress: true,
    port: 3000,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
  },

  module: {
    rules: [
      // js
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/common'),
          path.resolve(__dirname, 'src/blocks'),
          path.resolve(__dirname, 'src/helpers'),
        ],
        exclude: /node_modules/,
        use: ['babel-loader'],
      },

      // vue
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },

      // eslint
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitError: true,
        },
      },

      // style
      {
        test: /\.(sass|scss)$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                sourceMap: true,

                plugins: () => [
                  require('cssnano')({
                    preset: ['default', {
                      discardComments: {
                        removeAll: true,
                      },
                    }],
                  }),

                  require('autoprefixer')({
                    grid: 'autoplace',
                  }),
                ],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                importer: GlobImporter(),
                sourceMap: true,
              },
            },
          ],
        })),
      },

      // pug
      {
        test: /\.pug$/,
        oneOf: [
          // это применяется к `<template lang="pug">` в компонентах Vue
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader'],
          },
          // это применяется к импортам pug внутри JavaScript
          {
            use: [
              'raw-loader',
              {
                loader: 'pug-html-loader',
                options: {
                  pretty: true,
                  indent: 2,
                  data: { ...pugData },
                },
              },
            ],
          },
        ],
      },

      // img
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              publicPath: '../',
            },
          },
          {
            loader: 'img-loader',
          },
        ],
      },

      // fonts
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              publicPath: '../',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),

    new ExtractTextPlugin({
      filename: './css/[name].css',
      allChunks: true,
    }),

    new CopyWebpackPlugin(
      [
        {
          from: './img',
          to: 'img',
        },
      ],
    ),

    new CopyWebpackPlugin(
      [
        {
          from: './video',
          to: 'video',
        },
      ],
    ),

    new CopyWebpackPlugin(
      [
        {
          from: './favicon',
          to: 'favicon',
        },
      ],
    ),

    new CopyWebpackPlugin(
      [
        {
          from: './json',
          to: 'json',
        },
      ],
    ),

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),

    new StyleLintPlugin({
      failOnError: false,
      quiet: false,
    }),

    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ].concat(jadePlugins),

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'blocks': path.resolve(__dirname, './blocks'),
    }
  },
};

module.exports = (env, options) => {
  const production = mode === 'production';

  config.devtool = production ? false : 'source-map';

  if (production) {
    config.plugins.push(
      new CleanWebpackPlugin(['dist']),
    );

    // new CompressionPlugin({
    //   filename: '[path].br[query]',
    //   algorithm: 'brotliCompress',
    //   test: /\.(js)$/,
    //   compressionOptions: { level: 11 },
    //   threshold: 10240,
    //   minRatio: 0.8,
    //   deleteOriginalAssets: false
    // })

    // config.plugins.push(
    //   new UglifyJSPlugin({
    //     sourceMap: true,
    //   }),
    // );
  }

  return config;
};
