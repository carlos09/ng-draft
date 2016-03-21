// Initialize the express framework
var express 	 	= require('express'),
		routes 		= require("./routes"),
		path				= require('path'),
		busboy			= require('connect-busboy'),
		fs 					= require('fs-extra'),
		ejs 				= require("ejs"),
		mongoose		= require('mongoose'),
		passport 		= require('passport'),
		LocalStrategy = require('passport-local').Strategy,
		cors 				= require('cors'),
		methodOverride = require('method-override'),
		databaseName	= 'mongo_dd',
		bodyParser		= require('body-parser');

var user = require('./data/users.js');
var User = mongoose.model('Users');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// Express setup
var app = express();
var httpServer = require("http").createServer(app);
app.engine("html", ejs.renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // remember to install the body-parser module
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

/* Mongoose and MongoDB setup */
mongoose.connect("mongodb://localhost/" + databaseName);

app.use(session({
    store: new MongoStore({
        url: 'mongodb://localhost/' + databaseName
     }),
    secret: 'codetutorialsecret',
    resave:true,
    saveUninitialized:true
}));

app.use(passport.initialize());

app.use(passport.session());

passport.use(new LocalStrategy(
		function (username, password, done) {

				User.findOne({username: username}, function (err, user) {
					console.log('user is: ', user);

						if (err) {
								return done(err);
						}
						if (!user) {
								return done(null, false, {alert: 'Incorrect username.'});
						}
						if (user.password != password) {
								return done(null, false, {alert: 'Incorrect password.'});
						}
						return done(null, user);
				});
		}

));

passport.serializeUser(function(user, done) {
		done(null, user.id);
});

passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
				 done(err, user);
		});
});

function isAuthenticated(req,res,next){
		if(req.isAuthenticated())return next();
		 res.redirect('/');
}

function checkRoleType(req,res) {
	var roleType = req.user.roletype;
	console.log("ehcking role type", roleType);

}

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
app.post("/createset",isAuthenticated, routes.createPickSet);
//app.put("/createset/:id", routes.updatePickSet);

app.post('/auth/signup', routes.signup);

// app.post('/auth/login', passport.authenticate('local'),function(req, res){
// 	console.log('authenticate!', res);
// 		res.json(req.user);
// });

app.post('/auth/login',passport.authenticate('local'), routes.login);

app.get('/auth/currentuser', isAuthenticated, routes.currentUser);
app.get('/auth/logout', routes.logOut);

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
