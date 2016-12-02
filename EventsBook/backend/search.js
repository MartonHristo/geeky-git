var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://test:1234@ds117348.mlab.com:17348/hristo';
var express = require('express');
var fs = require('fs');
var app     = express();

app.use('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/:tag', function(req, res){
  var findCoords = function(db, callback) {
    var cursor;
    var query = new RegExp(req.params.tag);
       db.collection('events').aggregate( 
        [
        {"$unwind": "$events"},
        {"$match":{$or:[{"events.description":query}, {"events.name":query}]}}
        ]).toArray(	
        function(err, results){
         callback();
         res.json(results);
       // console.log(results[0].events.name);
         /*fs.writeFile('results.JSON', JSON.stringify(results), function (err,data) {
              if (err) {
                return console.log(err);
              }
            });*/
        });
  };

 MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    findCoords(db, function() {
        db.close();
    });
});
  
 
  
})
app.listen('8081')
console.log('Magic happens on port 8081');
//

