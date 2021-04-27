const express = require('express');
const app = express();

// Peter: if you get internal server error, the error is in your server
// next line needed to put data into DB, it was missing so was getting 
// server error 500 when we tried to post
// old way was... app.use(parser.json());
app.use(express.json());

const cors = require('cors');
app.use(cors());

const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

MongoClient.connect('mongodb://localhost:27017')
  .then((client) => {
    const db = client.db('birds');
    const sightingsCollection = db.collection('sightings');
    const sightingsRouter = createRouter(sightingsCollection);
    app.use('/api/sightings', sightingsRouter);
  })
  .catch(console.err);

app.listen(5000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
