var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var express = require('express');
var app = new (require('express'))()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));

app.use('/static', express.static('dist'));


<<<<<<< HEAD
app.get("/login", function(req, res) {
    res.sendFile(__dirname + '/src/html/login.html')
})
=======
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/src/html/index.html')
>>>>>>> 4c60ba27cdfe518a94b9106ad86299eaa5307754

app.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})
