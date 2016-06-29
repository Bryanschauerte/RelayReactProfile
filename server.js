import express from 'express';
var path = require('path');
import fs from 'fs';
import Schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import {graphql} from 'graphql';
import {introspectionQuery, printSchema} from 'graphql/utilities';
import {MongoClient} from 'mongodb';

import keys from './hideme.js';

const HIDEME = keys.mongodb;
var app = express();


app.use( express.static( path.join(__dirname, 'client') ));
let database ;
console.log("static in");
// MongoClient.connect(HIDEME, (err, db) => {
  // if(err) throw err;


  let schema = Schema();
  console.log("schema in");
  let json = graphql(schema, introspectionQuery)
  .then((resp, err) =>{
    if(err) throw err;
      fs.writeFile('./data/schema.json', JSON.stringify(resp, null, 2), error =>{
        if(error) throw error;
        console.log("new JSON created");
      });
  });

//db.collection("quotes").find({}).toArray().then((res, err) => console.log(res, "res"))

  app.use('/graphql', GraphQLHTTP({
    schema,
    graphiql: true
  }))

  app.listen(3000, ()=>{
    console.log("api listening on 3000")
  });





// })



var PORT = process.env.PORT || 8080;
app.listen( PORT, function() {
  console.log( 'Production panda dancing at localhost:' + PORT )
});
