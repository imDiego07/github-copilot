// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json();

// Create server
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
})

// Set up MongoDB connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true });

// Create schema for comments
var commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

// Create model for comments
var Comment = mongoose.model('Comment', commentSchema);

// Create route for retrieving comments
app.get('/comments', function (req, res) {
    console.log("GET request received");
    Comment.find({}, function(err, comments) {
        if (err) throw err;
        res.send(comments);
    });
})

// Create route for posting comments
app.post('/comments', jsonParser, function (req, res) {
    console.log("POST request received");
    var newComment = Comment(req.body);
    newComment.save(function(err) {
        if (err) throw err;
        res.send(req.body);
    });
})

// Create route for deleting comments
app.delete('/comments/:id', function (req, res) {
    console.log("DELETE request received");
    Comment.findByIdAndRemove(req.params.id, function(err) {
        if (err) throw err;
        res.send(req.params.id);
    })
})