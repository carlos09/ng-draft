// Initialize the express framework
var express 	 	= require('express'),
		routes 		= require("./routes"),
		path				= require('path'),
		ejs 				= require("ejs"),
		mongoose		= require('mongoose'),
		databaseName	= 'mongo_dd';
// Initialize the body-parser
// in order to receive the request body
// in POST, PUT and DELETE
var	bodyParser		= require('body-parser');

// Express setup
var app = express();
app.engine("html", ejs.renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // remember to install the body-parser module

/* Mongoose and MongoDB setup */
mongoose.connect("mongodb://localhost/" + databaseName);

var db = mongoose.connection;
db.on("error", console.error);
db.once("open", function(callback){
	console.log("MongoDB connection established to " + databaseName);
});

/* Routes */
app.get("/ok", routes.index);
app.get("/product/:id", routes.product);
app.get("/products", routes.products);
app.post("/product", routes.createProduct);
app.put("/product/:id", routes.updateProduct);
app.delete("/product/:id", routes.deleteProduct);
app.get("/picks", routes.picks);

var server = app.listen(3000, function(){
	var port = server.address().port;
	console.log("Listening on port " + port);
})
