
exports.index = function(req, res){
  // render a view: /views/index.html
  // res.render('index');

  // render a text
  // res.send("index route")

  // sends a 200 (OK)
  res.send(200);
};

exports.products = function(req, res){
	var ProductsModel = require("../data/products");
	ProductsModel.find(function(err, data){
		if(err) console.error;
		res.json(data);
	})
}

exports.product = function(req, res){
  var ProductsModel = require("../data/products");
  ProductsModel.findOne({id: req.params.id}, function(err, data){
    if(err) console.error;
    res.json(data);
  })
}

exports.createProduct = function(req, res){
  console.log('exports.createProduct');
  var ProductsModel = require("../data/products");
  var productData = req.body;
  var product = new ProductsModel(productData);
  product.save(function(err){
    if(err) console.error;
  })
}

exports.updateProduct = function(req, res){
  var ProductsModel = require("../data/products");
  var productData = req.body;
  var productId = req.params.id;
  var query = {id: req.params.id};
  ProductsModel.findOneAndUpdate(query, productData, function(err, response){

  })
}

exports.deleteProduct = function(req, res){
  var ProductsModel = require("../data/products");
  var productId = req.params.id;
  var query = {id: req.params.id};
  ProductsModel.remove(query, function(err){

  })
}

exports.picks = function(req, res){
  console.log('view picks');
	var PicksModel = require("../data/picks");
	PicksModel.find(function(err, data){
		if(err) console.error;
		res.json(data);
	})
}

exports.set = function(req, res){
  var PickSetModel = require("../data/picks");
  PickSetModel.findOne({id: req.params.id}, function(err, data){
    if(err) console.error;
    res.json(data);
  })
}

exports.createPickSet = function(req, res){
  console.log("in here");
  var PickSetModel = require("../data/picks");
  var picksetData = req.body;
  var set = new PickSetModel(picksetData);
  set.save(function(err){
    if(err) console.error;
  })
}

exports.signup = function(req, res) {
  console.log("do sign up!");
  var SignUpModel = require("../data/users");
  var userData = req.body;
  var u =  new SignUpModel(userData);
  u.username = req.body.email;
  u.password = req.body.password;
  u.lastname = req.body.lastname;
  u.firstname = req.body.firstname;
  u.email = req.body.email;
  u.roletype = 'player'

  u.save(function(err){
      if (err) {
          res.json({'alert':'Registration error'});
      }else{
          res.json({'alert':'Registration success'});
      }
  });
}


exports.login = function(req, res) {
  res.json(req.user);
}

exports.currentUser = function(req, res) {
  res.json(req.user);
}

exports.logOut = function(req, res) {
  req.logout();
  res.sendStatus(200);
}
