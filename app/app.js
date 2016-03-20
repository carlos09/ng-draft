// Initialize the express framework
var express 	 	= require('express'),
		routes 		= require("./routes"),
		path				= require('path'),
		busboy			= require('connect-busboy'),
		fs 					= require('fs-extra'),
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
app.use(busboy());
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

//app.get("/createset/:id", routes.set);
app.get("/picks", routes.picks);
app.post("/createset", routes.createPickSet);
//app.put("/createset/:id", routes.updatePickSet);

app.route('/upload')
.post(function (req, res) {
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
    var stream = fs.createWriteStream(__dirname + '/public/uploads/' + filename);
    file.pipe(stream);
    stream.on('close', function () {
      console.log('File ' + filename + ' is uploaded');
      res.json({
        filename: filename
      });
    });
  });
});



var server = app.listen(3000, function(){
	var port = server.address().port;
	console.log("Listening on port " + port);
})
