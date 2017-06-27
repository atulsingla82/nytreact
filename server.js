

// Include Server Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Require the Schema

const Article = require("./models/Article");

// Create a new express app 

const app = express();

// Set up Port 
const PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

app.use(express.static("./public"));

// -------------------------------------------------

//Connecting to MongoDB

const databaseUri = mongoose.connect("mongodb://localhost/newsdb");

if (process.env.MONGODB_URI) {

  mongoose.connect(process.env.MONGODB_URI);

} else {

  mongoose.connect(databaseUri);
}


// -------------------------------------------------

const db = mongoose.connection;

db.on("error", (err) => {
    console.log("Mongoose Error: ", err);
});

db.once("open",() => {
    console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route to render the application

app.get("/",(req,res) =>   {

res.sendFile(__dirname + "/public/index.html")

});


//Grabs all saved articles

app.get("/api/saved", function(req, res){
  Article.find({}).sort([
    ["date", "descending"]
  ]).limit(5).exec(function(err, doc){
    if(err){
      console.log(err);
    } else{
      res.send(doc);
    }
  });
});

app.post("/api/saved", function(req, res){
  console.log('BODY: ' + req.body.article);
  Article.create({
    title: req.body.title,
    date: Date.now(),
    url: req.body.url
  }, function(err) {
    if(err){
      console.log(err);
    } else{
      res.send("Saved Article");
    }
  });
});

app.delete("/api/saved/:id", function(req, res){
  Article.findByIdAndRemove({ _id: req.params.id }, function(err, doc){
    if(err){
      console.log(err);
    } else{
      res.redirect();
    }
  });
});

// -------------------------------------------------

// Starting our express server
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
