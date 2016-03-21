require('node-jsx').install({extension:'.jsx'});

var React = require('react');
var ReactDOMServer = require('react-dom/server')
var express = require('express');
var path = require('path');
var debug = require('debug')('my-application');
var server = express();

server.set('views', __dirname + 'views');
server.set('view engine', 'jsx');
server.engine('jsx', require('express-react-views').createEngine());

var Html = require('./views/Html.jsx');

server.use(express.static(path.join(__dirname, 'public')));

server.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   next();
});

server.get('/', function(req, res, next) {
	try {
    var html = '<!doctype html>'+ReactDOMServer.renderToStaticMarkup(React.createFactory(Html)());
    res.send(html);
	}
	catch (err) {
		next(err);
	};
});


/// catch 404 and forwarding to error handler
server.use(function(err, req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers
server.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err.message);
    res.write('<h1>Internal Server Error</h1>');
    res.end();
});

server.set('port', process.env.PORT || 3000);

var server = server.listen(server.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});