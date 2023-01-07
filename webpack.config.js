const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const miniCss = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: "[contenthash].js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: [
                    miniCss.loader,
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
        new CopyPlugin({
            patterns: [
                {from: "src/img", to: "img"},
            ],
        }),
        new CleanWebpackPlugin(),
        new miniCss({
            filename: 'style.css'
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
        },
        open: true,
        compress: true,
        port: 9000,
    },
}