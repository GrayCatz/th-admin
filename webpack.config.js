const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        main: './src/js/main.js'
    },
        // path.resolve(__dirname, './src/js/main.js'),
        // "webpack/hot/dev-server"], //指定入口文件，程序从这里开始编译,__dirname当前所在目录, ../表示上一级目录, ./同级目录
    output: {
        path : __dirname + '/dist', //输出路径，要用绝对路径
        filename : 'js/[name]-[hash].bundle.js', //打包之后输出的文件名
        // path: path.resolve(__dirname, 'dist'), // 输出的路径
        // filename: 'bundle.js'  // 打包后文件
    },
    mode: "development", //加上这一句试试
    devServer: {
        historyApiFallback: true,
        inline: true,
        contentBase: './dist/',
        port: '8086'   // 我电脑上默认的8080端口无法访问，所以设置port为8086
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template : './src/view/template.html',
            title : '博客首页-by ghostwu',
            filename : 'view/index.html',
            inject : true,
            chunks : ['main', 'index']
        })
    ]
}