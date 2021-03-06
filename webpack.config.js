var path = require('path')
var fs = require('fs')
var webpack = require('webpack')
var env = process.env.NODE_ENV
var EXAMPLES_DIR = path.resolve(__dirname, 'src/js/entry');

function buildEntries() {
    return fs.readdirSync(EXAMPLES_DIR).reduce(function (entries, dir) {
        var name = dir.split(".")[0];
        entries[name] = path.join(EXAMPLES_DIR, dir);
        return entries;
        }, {});
}
var config = {
    entry: buildEntries(),
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
    config.entry = {
        index: ['./src/js/entry/index.js','webpack-hot-middleware/client'],
        data: ['./src/js/entry/data.js','webpack-hot-middleware/client'],
        media: ['./src/js/entry/media.js','webpack-hot-middleware/client'],
        mbd: ['./src/js/entry/mbd.js','webpack-hot-middleware/client']
    }
}

module.exports = config
