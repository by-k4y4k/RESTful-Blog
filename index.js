// SECTION 31 LECTURE 309
// RESTFUL BLOG - DESTROY

// require consts
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();

// app config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
/* methodOverride will look for a specific string in GET requests - we've set it
to '_method' and use that to determine if and when it should override the http
method. */
app.use(methodOverride("_method"));

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

// show route
app.get("/blogs/:id", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("show", {blog: foundBlog});
    }
  });
});

// edit route
app.get("/blogs/:id/edit", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("edit", {blog: foundBlog});
    }
  });
});

// update route
app.put("/blogs/:id", function(req, res) {
  /* TODO: Express throws an error about findbyIdAndUpdate being depreciated */
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(
    err,
    updatedBlog
  ) {
    if (err) {
      res.redirect("/");
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  });
});

// destroy
app.delete("/blogs/:id", function(req, res) {
  Blog.findByIdAndRemove(req.params.id, function(err) {
    /* even though both outcomes are the same, it's good to have... um, error
    acknowledging.*/
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs");
    }
  });
});

app.listen("1234", "localhost", function() {
  // eslint-disable-next-line no-console
  console.log("Now listening on http://localhost:1234");
});
