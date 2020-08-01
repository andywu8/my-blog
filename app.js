//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");

const homeStartingContent = "This is my blog where I keep track of my daily adventures! This project was coded in Html, CSS, Javascript with a Node.JS backend. This website is deployed through Heroku. Go to Compose to add new entries";
const aboutContent = "This is the about page, you won't find much content here, I recommend checking the blog!";
const contactContent = "You can find me on Linkedin at https://www.linkedin.com/in/andywu-yale/";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts = [];

app.get("/", function(req, res){
  res.render("home", {
    content: homeStartingContent, 
    posts:posts
  });
})

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
})

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
})

app.get("/compose", function(req,res){
  res.render("compose");
})

app.post("/compose", function(req, res){
  const post = {
    postTitle:req.body.postTitle,
    postBody:req.body.postBody
  };
 
  posts.push(post);
  res.redirect("/");
});


app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.postTitle);
    if (storedTitle === requestedTitle){
      res.render("post", {
        postTitle: post.postTitle,
        postBody: post.postBody
      });
    }
  });
});






app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
