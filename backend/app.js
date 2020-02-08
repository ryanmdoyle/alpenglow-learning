const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const flash = require('connect-flash'); //passes things to next requests
// const expressValidator = require('express-validator'); // for validating requests
const createError = require('http-errors');
const helpers = require('./helpers');
const helmet = require('helmet')

const indexRouter = require('./routes/index.js');
const app = express();

// serve files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// body-parser middleware for reading requests on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// a bunch of stuff for validating user input
// app.use(expressValidator());

// deals with cookies passed in the requests
app.use(cookieParser());

// basic security
app.use(helmet());

// flash middleware to pass message to next page --> req.flash('error', 'Shit!')
app.use(flash());

// uses indexRouter.js for all routes
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// custom Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
})

module.exports = app;