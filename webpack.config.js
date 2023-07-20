const path = require('path');

module.exports = {
    mode: 'development',
    context: __dirname ,
    entry: path.resolve(__dirname, 'src'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        clean: true,
    },
    devServer: {
        static: path.resolve(__dirname, 'public'),
        hot: true
    }
};
