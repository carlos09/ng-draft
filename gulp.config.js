function gulpConfig() {
	var nodeServer 	= "./app/";
	var client 		= nodeServer + "public/";
	var	nodeApp 	= nodeServer + "app.js";

	var config = {
		nodeServer: nodeServer,
		client: client,
		browserSyncFiles: [client + "**/*", nodeApp, nodeServer + "views/**/*", nodeServer + "routes/**/*.js"],
		browserSyncPort: 4000,
		nodeServerPort: 3000,
		nodeApp: nodeApp
	};



	return config;
};


module.exports = gulpConfig;
