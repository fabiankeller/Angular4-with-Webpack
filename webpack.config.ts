import * as path from 'path';
import HtmlWebpackPlugin = require('html-webpack-plugin');
import * as webpack from 'webpack';
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
import MyFirstWebpackPlugin from './webpack/MyFirstWebpackPlugin';

class WebpackConfiguration implements webpack.Configuration {
    entry: webpack.Entry = {
        main: './src/main.ts'
    }
    output: webpack.Output = {
        path: path.join(__dirname, './dist'),
        filename: '[name].bundle.js',
    }
    resolve: webpack.Resolve = {
        extensions: ['.js', '.ts', '.html']
    }
    devServer: any = {
        contentBase: path.join(__dirname, './dist'),
        port: 9000
    }
    devtool: webpack.Options.Devtool =  'inline-source-map'
    module: webpack.Module = {
        rules: [
            {
                test: /.ts$/,
                enforce: 'pre',
                exclude: /(node_modules)/,
                use: 'tslint-loader',
            },
            {
                test: /.ts$/,
                exclude: /(node_modules)/,
                use: [
                    'awesome-typescript-loader',
                    'angular2-template-loader'
                ]
            },
            {
                test: /.html$/,
                exclude: /(node_modules)/,
                use: 'raw-loader'
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader?sourceMap' // translates CSS into CommonJS
                }, {
                    loader: 'sass-loader?sourceMap' // compiles Sass to CSS
                }]
            }
        ]
    }
    plugins: webpack.ResolvePlugin[] = [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            showErrors: true,
            path: path.join(__dirname, './dist/'),
            hash: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new UglifyJSPlugin(),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core/,
            path.resolve(__dirname, './src')
        )
    ]
}

module.exports = new WebpackConfiguration();
