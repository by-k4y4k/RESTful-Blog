// SECTION 31 lecture 301
// RESTFUL blog - index

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// app config
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// mongoose connect
mongoose.connect(
  "mongodb://localhost/restful_blog_app",
  {useNewUrlParser: true}
);

// mongoose model config
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

Blog.create({
  title: "Does it?",
  image: "https://pbs.twimg.com/media/DZmkiWbX4AAfz4b.png",
  body: "He might do it, but has it been done too far?",
});

// RESTful routes:

// root redirect to /blogs:
app.get("/", function(req, res) {
  res.redirect("/blogs");
});

// Index route
app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log("There was an error:");
      console.log(err);
    } else {
      res.render("index", {blogs: blogs});
    }
  });
});

// create

// new

// show

// edit

// update

// destroy

app.listen("1234", "localhost", function() {
  // eslint-disable-next-line no-console
  console.log("Now listening on http://localhost:1234");
});
