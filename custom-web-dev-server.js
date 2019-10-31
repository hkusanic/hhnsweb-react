var webpack = require('webpack')
var webpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')

new webpackDevServer(webpack(config), {
    hot: true,
    publicPath: config.output.congigPath,
    historyApiFallBack: true,
    proxy: {
        "*": "http://localhost:3000"
    },
    scripts: {
        "start:dev": webpack - dev - server
    }
}).listen(8080, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log("connected");
});