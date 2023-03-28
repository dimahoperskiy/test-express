var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var participantsRouter = require('./routes/participants');
var promosRouter = require('./routes/promo');

var app = express();

mongoose.connect('mongodb://127.0.0.1:27017/promo', {useNewUrlParser: true, useUnifiedTopology: true, autoCreate: true})
const db = mongoose.connection
// db.dropDatabase()
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('connected'))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/participants', participantsRouter);
app.use('/promo', promosRouter);


module.exports = app;
