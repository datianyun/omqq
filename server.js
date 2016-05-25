var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var express = require('express');
var app = new (require('express'))()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))
app.use('/static', express.static('dist'));

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/src/html/index.html')
})


app.get("/login", function(req, res) {
  res.sendFile(__dirname + '/src/html/login.html')
})

app.get("/system", function(req, res) {
  res.sendFile(__dirname + '/src/html/system.html')
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
