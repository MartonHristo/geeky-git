var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

MongoClient.connect('mongodb://test:1234@ds117348.mlab.com:17348/hristo', function(err, db) {
    if(err) throw err;

 var fs = require('fs');
var mydocuments = fs.readFile('events.JSON', 'utf8', function (err, data) {
var collection = db.collection('events');
 collection.insert(JSON.parse(data), function(err, docs) { // Should succeed
    collection.count(function(err, count) {
        console.log(format("count = %s", count));
        console.log("[" + data + "]" );
        db.close();
    });
});
        });
    });