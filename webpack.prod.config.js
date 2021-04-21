const path = require('path');
const CssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry : './src/index.tsx',
    output: {
        path: path.resolve(__dirname , 'dist'),
        filename: "[fullhash].js",
        publicPath: '/'
    },
    mode: "production",
    resolve: {
        extensions: ['.tsx' , '.ts' , '.js' , '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    CssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.CRYPTO_SECRET": JSON.stringify(process.env.CRYPTO_SECRET)
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html'
        }),
        new CssExtractPlugin({
            filename: 'css/[fullhash].css',
            linkType: 'text/css'
        }),    
    ]
}