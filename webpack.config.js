var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src', 'app.js'),
    output: {
        path: path.join(__dirname, 'src'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    devServer: {
        historyApiFallback: true
    }
}