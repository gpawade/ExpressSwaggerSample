var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var swagger = require("swagger-node-express");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//SWAGGER SETTING 
var swaggerui = __dirname + '/node_modules/swagger-node-express/swagger-ui/';
var docs_handler = express.static(swaggerui);

app.get(/^\/docs(\/.*)?$/, function (req, res, next) {
  if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
    res.writeHead(302, { 'Location': req.url + '/' });
    res.end();
    return;
  }
  // take off leading /docs so that connect locates file correctly
  req.url = req.url.substr('/docs'.length);
  return docs_handler(req, res, next);
});
swagger.setAppHandler(app);
var models ={
    "Person":{
         'id':'Category',
        'required': ['id', 'name'],
        'properties':{
          'id':{
            'type':'integer',
            
            'description': 'person unique identifier',
            
          },
          'name':{
            'type':'string',
            'description': 'Name of the category'
          }
      }
    }
  };

swagger.addModels({"models" : models});

require('./api/person')(swagger);

swagger.setApiInfo({
  title: 'Sample API',
  description: 'Test the swagger UI'
   //termsOfServiceUrl: '',
    //contact: '',
    //license: '',
    //licenseUrl: ''
  });

swagger.configureSwaggerPaths("", "api-docs", "")
swagger.configure("http://localhost:8002", "1.0.0");

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
