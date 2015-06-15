//Setting up express app
var express = require("express");
var app = new express();
app.set('port',3000);
app.use(express.static(__dirname + '/public')); //declare everything in public folder is static 


//Setting up handlebars 
var handlebars = require('express3-handlebars').create({defaultLayout : 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine' , 'handlebars');

//custom module
var mod1 = require('./lib/demo.js');


//Setup handler for request
app.get('/',function(req,res){
	res.render('home');
	console.log(mod1.hello()); // test custom module 
});

//set custom 404 page 
app.use(function(req, res, next){
	res.type('text/plain');
	res.status(404);
	res.send("404 - Not found");
});

//create server
app.listen(app.get('port'),function(){
	console.log("The server is opened at port 3000");
});


