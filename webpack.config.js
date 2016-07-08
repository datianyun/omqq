var path = require('path')
var fs = require('fs')
var webpack = require('webpack')
var env = process.env.NODE_ENV
var EXAMPLES_DIR = path.resolve(__dirname, 'src/js/entry');

function isDirectory(dir) {
    return fs.lstatSync(dir).isDirectory();
}

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
}

module.exports = config
