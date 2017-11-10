const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: './src/main.ts'
    },
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "[name].bundle.js",
    },
    resolve: {
        extensions: ['.js', '.ts', '.html']
    },
    devServer: {
        contentBase: path.join(__dirname, "./dist"),
        port: 9000
    },
    devtool: 'inline-source-map',
    module: {
        loaders: [
            { 
                test: /.ts$/, 
                use: [
                    'awesome-typescript-loader', 
                    'angular2-template-loader'
                ]
            },
            { 
                test: /.html$/, 
                use: 'raw-loader' 
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader?sourceMap" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader?sourceMap" // compiles Sass to CSS
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            showErrors: true,
            title: "Webpack App",
            path: path.join(__dirname, "./dist/"),
            hash: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core/,
            path.resolve(__dirname, './src')
        )
    ]
    
}