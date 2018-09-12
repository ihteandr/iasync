const path = require('path');
const options = {
    entry: './src/index.js',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015'],
                    plugins: ['transform-object-rest-spread'],
                },
            },
        ],
    },
    stats: {
        colors: true,
    },
};
module.exports = [
    Object.assign({}, options, {
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'index.js',
            library: 'iasync',
            libraryTarget: 'umd',
        },
        target: 'node'
    }),
    Object.assign({}, options, {
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'index.browser.js',
            library: 'iasync',
            libraryTarget: 'umd',
        },
        target: 'web'
    }),
];