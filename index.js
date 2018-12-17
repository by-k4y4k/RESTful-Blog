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

// RESTful routes:

// / => /blogs
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

// New route
app.get("/blogs/new", function(req, res) {
  res.render("new");
});

// Create route

app.post("/blogs", function(req, res) {
  /* The form inputs were given the name attrivute of blog[title], blog[body]
  and blog[image]. This means that the title, body and image associated with the
  blog post can be accessed from the blog object inside of the body object which
  is then inside of the request object. */
  Blog.create(req.body.blog, function(err, newBlog) {
    if (err) {
      res.render("new");
    } else {
      // redirect to blog list
      res.redirect("/blogs");
    }
  });
});

// show
app.get("/blogs/:id", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("show", {blog: foundBlog});
    }
  });
});

// edit

// update

// destroy

app.listen("1234", "localhost", function() {
  // eslint-disable-next-line no-console
  console.log("Now listening on http://localhost:1234");
});
