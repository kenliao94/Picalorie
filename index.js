//Setting up express app
var express = require("express");
var app = new express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));//parse POST request 

//Setting up for mongoDB
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require ('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

//Setting up for AlchemyAPI
var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI('6957b9d73bee3a6e207ff9fc1ac54091ebd26244');
//setup Alchemy, false by default
const use_alchemy = true;
if(use_alchemy){
  var request = require('request');  
}


//Set up app
app.set('port',3000);
app.use(express.static(__dirname + '/public')); //declare everything in public folder is static 
app.use('/bower_components',express.static(__dirname + '/bower_components'));

//Setting up handlebars 
var handlebars = require('express3-handlebars').create({defaultLayout : 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine' , 'handlebars');


//Setup handler for request
app.get('/',function(req,res){
  if(req.xhr){
    res.render('home', {layout : false});
  }
  else{
    res.render('home');
  }
});

app.get('/recipes',function(req,res){
	if(req.xhr){
    res.render('recipes', {layout : false});
  }
  else{
    res.render('recipes');
  }
});

app.get('/news_feed', function(req,res){
  if(req.xhr){
    res.render('news_feed', {layout : false});
  }
  else{
    res.render('news_feed');
  }
});

//generate a nutrient fact page for the receipt 
app.post('/get-nutrient-fact',function(req,res){
  var feed_to_watson = req.body.feed_to_watson;
  //debug
  console.log("The data sent when user pressed submit");
  if(use_alchemy == true){
      alchemy.keywords(feed_to_watson,{},function(err,response,body){
        if(err){
          return console.log(err);
        }
        keywords = response.keywords;
        //debug
        console.log("Keyword is:");
        console.log(keywords);
        request.post("http://kenliao.me:3001/retrieve-nutrient",{ form: { keyword : JSON.stringify(keywords)} },function(err,data){
          console.log("Result from databsae API is");
          console.log(data.body);
          food = JSON.parse(data.body);
          res.render('nutrient_fact',{list_of_food : food , layout : false});
        });
      });
  }
  else{
    var mock_data = [{"name":"apple", "calory":"123", "health":"healthy"},{"name":"orange","calory":"456","health" : "healthy"},{"name":"banana","calory":"789","health":"healthy"}];
    res.render('nutrient_fact',{ list_of_food : mock_data , layout : false});
  }
});


//set custom 404 page 
app.use(function(req, res, next){
	res.type('text/plain');
	res.status(404);
	res.send("404 - Not found");
});

//create server
const bluemix = false; //true if this code is to be deployed on bluemix server, false by default
if(!bluemix){
  app.listen(app.get('port'),function(){
  console.log("The server is opened at port 3000. It is deployed on Ken's server");
});
}
else{
  var cfenv = require('cfenv');
  var appEnv = cfenv.getAppEnv();
  app.listen(appEnv.port,appEnv.bind,function(){
    console.log("server starting on " + appEnv.url);
  });
}



