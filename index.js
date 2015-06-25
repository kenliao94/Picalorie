//Setting up express app
var express = require("express");
var app = new express();
//Setting up for mongoDB
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require ('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

//Setting up for AlchemyAPI
var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI('6957b9d73bee3a6e207ff9fc1ac54091ebd26244');

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

app.get('/receipts',function(req,res){
	if(req.xhr){
    res.render('receipts', {layout : false});
  }
  else{
    res.render('receipts');
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

app.get('/getname',function(req,res){
  var uname = req.param('name');
  console.log(uname);
  res.render('name', { name : uname , layout : false});
});

app.get('/login',function(req,res){
	res.render('login');
});

// test mongoDB insert
/*MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  insertDocument(db, function() {
      db.close();
  });
});*/

//set custom 404 page 
app.use(function(req, res, next){
	res.type('text/plain');
	res.status(404);
	res.send("404 - Not found");
});

//create server
app.listen(app.get('port'),function(){
	console.log("The server is opened at port 3000");

// test alchemy API
// TODO: later change to front end through POST/GET 
var hardcodeurl = "http://allrecipes.com/Recipe/Honey-Ginger-Grilled-Salmon-2/Detail.aspx?evt19=1&referringHubId=2834";
console.log('hardcode URL:: %s', hardcodeurl);

alchemy.keywords(hardcodeurl,{},function(err,response,body){
    if (err){
	     return console.error(err.stack);
      // throw err;
    }
    // debug for entire response in JASON
    //console.log("Jason Body002:: %j",  response);

    // kwd is returned jason array for using Alchemy keyword extraction
    var kwd = [];
    kwd = response.keywords;
    // loop through each JASON object in array kwd
    for (var element in kwd ){
      console.log(element + ": %j" , kwd[element].text);    
    }

  })

});









// new delete function for mongoDB
/*var DeleteDocument = function (db,_collection,_id,callback){
  db.collection(_collectopn).delete( {
  // delete item according to _id

 }, function(err, result) {
    assert.equal(err, null);
    console.log("Deleted a document from the restaurants collection.");
    callback(result);
  });

}
*/

// new insert function for mongoDB
/*var insertDocument = function(db, callback) {
   db.collection('restaurants').insert( {
      "address" : {
         "street" : "2 Avenue",
         "zipcode" : "10075",
         "building" : "1480",
         "coord" : [ -73.9557413, 40.7720266 ],
      },
      "borough" : "Manhattan",
      "cuisine" : "Italian",
      "grades" : [
         {
            "date" : new Date("2014-10-01T00:00:00Z"),
            "grade" : "A",
            "score" : 11
         },
         {
            "date" : new Date("2014-01-16T00:00:00Z"),
            "grade" : "B",
            "score" : 17
         }
      ],
      "name" : "Vella",
      "restaurant_id" : "41704620"
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback(result);
  });
};*/

// test mongoDB insert
/*MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  insertDocument(db, function() {
      db.close();
  });
});*/
