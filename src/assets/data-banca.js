var MongoClient = require('mongo').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Horses");
  var myobj = { Nombre: "Company Inc", UID: "Highway 37" };
  dbo.collection("bancas").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});