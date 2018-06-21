var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config.js');
var base58 = require('./base58.js');
var Url = require('./models/url.js');

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  // route to serve index html
  console.log(__dirname);
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/api/shorten', function(req, res){
  // route to create and return short url
  // console.log(req.body['url']);

  var longUrl = req.body.url;
  // console.log(longUrl)
  var shortUrl = ''; // to be returned

  Url.findOne({ long_url: longUrl },  function(err, doc) {
    if (doc) {
      // URL has been shortened
      // console.log(doc)
      shortUrl = config.webhost + base58.encode(doc._id);
      res.send({'shortUrl': shortUrl});
    } else {
      // console.log(err)
      //create New Url
      var newUrl = Url({
        long_url: longUrl
      });

      //Save new Url
      newUrl.save(function(err) {
        if (err) {
          console.log(err);
        }

        shortUrl = config.webhost + base58.encode(newUrl._id);
        res.send({'shortUrl': shortUrl});
      })
    }
  });
});

app.get('/:encoded_id', function(req, res){
// redirect to original url given short url
  var base58Id = req.params.encoded_id;
  var id = base58.decode(base58Id);

  // check if url already exists in database
  Url.findOne({_id: id}, function (err, doc){
    if (doc) {
      // found an entry in the DB, redirect the user to their destination
      console.log(doc.long_url)

      res.redirect(doc.long_url);


    } else {
      // nothing found, take 'em home
      res.redirect(config.webhost);
    }
  });
});

var server = app.listen(3000, function(){
  console.log('This is Docter Frasier Crane. I\'m listening.')
})







