'use strict';

var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
    entry: './Scripts/app/app.jsx',
    output: {
        //path: __dirname,
        filename: './dist/bundle.js'
    },
    resolve: {
        modules: [
            __dirname,
            'node_modules',
            './Scripts/app/components',
            './Scripts/app/components/Main',
            './Scripts/app/components/Admin',
            './Scripts/app/api'
        ],
        alias: {
            actions: 'Scripts/app/actions/actions.jsx',
            actionTypes: 'Scripts/app/actions/actionTypes.jsx',
            reducers: 'Scripts/app/reducers/reducers.jsx',
            configureStore: 'Scripts/app/store/configureStore.jsx'
        },
        extensions: ['.js', '.jsx']
    },
    //devServer: {
    //    contentBase: '.',
    //    host: 'localhost',
    //    port: 9000
    //},
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2015', 'stage-0']
                },
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    devtool: debug ? "inline-sourcemap" : false,//,'cheap-module-eval-source-map',// try setting the value to either "inline-source-map" or "eval-source-map" instead.,
    plugins: debug ? [] : [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new JavaScriptObfuscator({
            rotateUnicodeArray: true
        }, ['abc.js'])
    ],
};