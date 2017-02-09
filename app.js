var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db;

if (process.env.ENV === 'Test') {
    db = mongoose.connect('mongodb://88.198.184.98:27017/bookAPI_test');
}
else {
    db = mongoose.connect('mongodb://88.198.184.98:27017/bookAPI');
}

var Book = require('./models/bookModel');
var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var bookRouter = require('./routes/book')(Book);
app.use('/api', bookRouter);

app.get('/', function (request, response) {
   response.send('welcome :)');
});

app.listen(port);

module.exports = app;