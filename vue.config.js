module.exports = {
	devServer: {
		proxy: {
			'/applicants': {
				target: 'http://127.0.0.1:3333'
			}
		}
	},
	publicPath: process.env.NODE_ENV === 'production'
		? '/crowe-web'
		: '/'
}