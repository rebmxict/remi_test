module.exports = {
	module: {
	  	rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.css$/,
				loader:[ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.(gif|svg|jpg|png)$/,
				loader: "file-loader"
			}
	  	]
	}
}