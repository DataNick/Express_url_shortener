var express = require('express');
var app = express();
var path = require('path');

// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  // route to serve index html
  console.log(__dirname);
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/api/shorten', function(req, res){
  // route to create and return short url
});

app.get('/:encoded_id', function(req, res){
// redirect to original url given short url
});

var server = app.listen(3000, function(){
  console.log('This is Docter Frasier Crane. I\'m listening.')
})