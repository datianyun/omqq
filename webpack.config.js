var path = require('path')
var webpack = require('webpack')
var env = process.env.NODE_ENV
var config = {
    //devtool: 'cheap-module-eval-source-map',
    entry: {
        //login: ['./src/js/entry/login.js','webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'],
        //system: ['./src/js/entry/system.js','webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr']
        index: ['./src/js/entry/login.js'],
        media: ['./src/js/entry/media.js'],
        data: ['./src/js/entry/data.js'],
        config: ['./src/js/entry/system.js'],
        static: ['./src/js/entry/static.js']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [ 'babel' ],
                exclude: /node_modules/,
                include: __dirname
            },
            {
                test: /\.css?$/,
                loaders: [ 'style', 'raw' ],
                include: __dirname
            }
        ]
    }
}

if (env === 'development') {
    config.devtool = 'cheap-module-eval-source-map';
}

module.exports = config
