const express = require("express");
const middleware = require("./routes/middleware");
const routes = require("./routes/routes.js");
const mongodb = require("mongodb");
const ndjson = require("ndjson");
const fs = require("fs");
const DB_URI =
  "mongodb+srv://sahil19:sahil19@cluster0-zy5h6.mongodb.net/test?retryWrites=true&w=majority";
const app = express();
const port = process.env.PORT || 80;

// app.use(express.static("public"));

// app.get("/", (request, response) => {
//   response.sendFile(__dirname + "/index.html");
// });

fs.createReadStream("./product.txt")
  .pipe(ndjson.parse({ strict: false }))
  .on("data", function (obj) {
    // console.log(obj);
  });

// defining middlewares
app.use(express.json());
app.use(middleware.preventCROS);

console.log("connecting to database...");

mongodb.MongoClient.connect(DB_URI, (error, dbClient) => {
  if (error) {
    console.log("error while connecting to dbClient", error);
    return;
  }
  // on successful connection
  console.log("Successfully connected to Database");
  const database = dbClient.db("clothingproduct");
  routes(app, database);
  app.listen(port, () => {
    console.log(`Server started at ${port}`);
  });
});
