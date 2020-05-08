const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://enrique-lopez:oB@S4eHd^TD2mZ@cluster0-iboeu.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(client => {
    console.log("Connected!");
    _db = client.db();
    callback(client);
  })
  .catch(err => {
    console.log(err);
    throw err;
  });
};


const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!"
};


exports.mongoConnect = mongoConnect;
exports.getDb = getDb; 