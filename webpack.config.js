var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
	// Since webpack 4 we will need to set in what mode webpack is running
	mode: 'development',
	// This will be the entry file for all of our React code
	entry: [
		'./client/index.jsx',
	],
	// This will be where the final bundle file will be outputed
	output: {
		path: path.join(__dirname, '/server/public/js/'),
		filename: 'bundle.js',
		publicPath: 'js/',
	},
	// Adding babel loader to compile our javascript and jsx files
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						'react',
						'env',
						'es2015',
						'babel-preset-stage-0'
					],
				cacheDirectory: true,	
				plugins: ['react-hot-loader/babel']
				},
			},
		},
		{
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'sass-loader']
			}),
		},
		{
			test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader?importLoaders=1', 'postcss-loader', 'less-loader']
				})},
		{
			test: /\.(png|jpg|gif)$/,
			use: [{
				loader: 'file-loader',
				options: {
					
				}
			}]
		},
		{
			test: /\.(ttf|eot|woff|woff2)$/,
			use: {
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[ext]',
				},
			},
		},
		{
			// Match woff2 in addition to patterns like .woff?v=1.1.1.
			test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
			use: {
				loader: 'url-loader',
				options: {
					// Limit at 50k. Above that it emits separate files
					limit: 50000,

					// url-loader sets mimetype if it's passed.
					// Without this it derives it from the file extension
					mimetype: 'application/font-woff',

					// Output below fonts directory
					name: './fonts/[name].[ext]',
				},
			},
		},
		{
			test: /\.woff$/,
			use: {
				loader: 'url-loader',
				options: {
					limit: 50000,
				},
			},
		},
		{
			test: /\.svg$/,
			loader: 'svg-inline-loader',
		},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.scss'],
	},
};
