const app = require('./app');
const mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

// // Create a MongoDb Client
// const client = new MongoClient(process.env.MONGOURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// Mongoose DB
mongoose.connect(`${process.env.MONGOURI}`, { useNewUrlParser: true, useUnifiedTopology: true, })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("we're connected!");
});

// Initialize Server
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running -> PORT ${server.address().port}`);
})