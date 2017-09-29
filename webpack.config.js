const path = require( 'path' );

const webpack = require( 'webpack' );

const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

// const UglifyJsPlugin     = require( 'webpack/lib/optimize/UglifyJsPlugin' );

module.exports = function (env) {

	const prefix = env.production ? 'min' : 'build';

	//define entry point
	// entry: path.resolve( __dirname, '/assets/js/custom/announcements.js' ),

	//define output point
	// output: {
	// 	filename: `[name].${prefix}.js`,
	// 	path: path.resolve(__dirname, 'public/assets/js'),
	// 	publicPath: '/assets/js/'
	// }

	let config = {

		resolve: {
			alias: {
				easyui: path.resolve(__dirname, 'resources/easyui/'),
				res_js: path.resolve(__dirname, 'resources/js/'),
				res_css: path.resolve(__dirname, 'resources/css/'),
			},
		},

		// entry points = build/min files
		entry: {
			// app: './resources/app.js',
			vendor: [
				'page',
				'jquery',
				'popper.js',
				'tooltip.js',
			],
			plugins: [
				'bootstrap',
				'jquery-validation',
				'moment',
				'easyui/jquery.easyui.min.js',

				'res_js/app-js/easyui-configs.js',
				'res_js/texteditor/jquery.texteditor.js',

				'res_js/app-js/bootstrap-notify.js',
				'res_js/app-js/design-tweks.js',
			],
			'style_app': [
				'bootstrap/dist/css/bootstrap.css',
				'open-iconic/font/css/open-iconic-bootstrap.css',

				'easyui/themes/metro/easyui.css',
				'easyui/themes/icon.css',
				'easyui/themes/color.css',

				'res_css/texteditor/texteditor.css',
				'res_css/bs_custom.css',
				'res_css/custom.css',
			],

			app: [
				'res_js/app-js/config-app.js',
				'res_js/app-js/app-helper.js',
				'res_js/app-js/announcement.js',
				'res_js/login-module/login.js',
			],

			// login: [
			// 	'res_js/login-module/login.js'
			// ],

			// announ: [
			// 	'res_js/app-js/announcements.js',
			// ],

			/*
			'style_login': [
				'bootstrap/dist/css/bootstrap.css',
				'open-iconic/font/css/open-iconic-bootstrap.css',
				'easyui/themes/metro/easyui.css',
				'./resources/styles/login.css',
			],
			*/
			mobile: 'easyui/jquery.easyui.mobile.js',
			'style_mobile': 'easyui/themes/mobile.css',
		},

		output: {
			filename: `[name].${prefix}.js`,
			path: path.resolve(__dirname, 'assets/bundle/js'),
			publicPath: '/assets/bundle'
		},

		devtool: env.production ? 'nosources-source-map' : 'cheap-module-source-map',

		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['env'],
						}
					}
				},
				{
					test: /\.css$/,
					use: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: {
							loader: "css-loader",
							options: {
								sourceMap: true,
								minimize: env.production ? true : false
							}
						}
					})
				},
				{
					test: /\.(woff|woff2|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
					use: [{
						loader: 'file-loader',
						options: {
							// context: path.resolve(__dirname, "resources/fonts"),
							name: '[name].[ext]',
							outputPath: '../font/'
						}
					}]
				},
				{
					test: /\.(svg|png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
					use: [{
						loader: 'file-loader',
						options: {
							// context: path.resolve(__dirname, "resources/images"),
							name: '[name].[ext]',
							outputPath: '../image/'
						}
					}]
				},
				{
					test: /\.(mp3|wav)(\?v=\d+\.\d+\.\d+)?$/i,
					use: [{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: '../audio/'
						}
					}]
				},
			]
		},

		plugins: [
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery',

				Popper: 'popper.js',
				Tooltip: 'tooltip.js',

				'moment': 'moment',
				// 'window.moment': 'moment',
			}),
			new ExtractTextPlugin({
				filename: function (getPath) {
					return getPath(`../css/[name].${prefix}.css`).replace('style_', '');
				},
				allChunks: true
			}),
			new webpack.HashedModuleIdsPlugin(),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor',
				minChunks: Infinity
			}),
			new webpack.optimize.CommonsChunkPlugin({
				names: ['plugins', 'mobile'],
				minChunks: Infinity,
				children: true,
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'manifest',
				minChunks: Infinity
			}),
			/*
			new BrowserSyncPlugin({
				https: true,
				open: 'external',
				host: 'agent.onyxlab-slave-v3.com',
				port: 3000,
				proxy: 'https://agent.onyxlab-slave-v3.com'

			})
			*/
		],
	};

	if (env.production) {

		config.plugins.push(new webpack.optimize.UglifyJsPlugin());

		config.plugins.push(new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}));
	}

	// console.log(config);

	return config;
}
