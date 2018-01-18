

//	IMPORT MODULES
// ==================================================

// base
const http				= require('http');
const express			= require('express');
const path				= require('path');
const appDir			= path.dirname(require.main.filename);

// modules
const favicon			= require('serve-favicon');
const methodOverride	= require('method-override');
const session			= require('express-session');
const bodyParser		= require('body-parser');
const multer			= require('multer');
const errorHandler		= require('errorhandler');

// routes (order matters)
const router			= require('./controllers/router');
const api				= require('./controllers/api');
const routeErrors		= require('./controllers/errorRouter'); // LAST





//	INIT APP
// ==================================================
const app 				= express();





//	ROUTES
// ==================================================

// main routes
app.use('/', router);

// api routes
app.use('/api', api);

// eg. user routes
// app.use('/user', user);

// error routes
app.use('/', routeErrors);





//	CONFIG ENVIRONMENT
// ==================================================

// set DEFAULT port
app.set('port', process.env.PORT || 8080);

// favicon
app.use(favicon(path.join(appDir, '/public/favicon.ico')));

// allow PUT or DELETE methods for router
app.use(methodOverride());

// allow session storing
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: 'asd123'
}));

// allow JSON parsing
app.use(bodyParser.json());

// allow URL encoding
app.use(bodyParser.urlencoded({ extended: true }));

// handle multipart/form-data
app.use(multer);

// allow 'public' DIR accress
app.use(express.static(path.join(appDir, 'public')));





//	500 ERROR HANDLING
// ==================================================
// error-handling middleware, take the same form as regular middleware
// if connection has an error, it will invoke ONLY error-handling middleware
// If we were to next() here any remaining non-error-handling middleware
// would then be executed, or if we next(err) to continue passing the error,
// only error-handling middleware would remain being executed, however here
// we simply respond with an error page.

// check environment
if (app.get('env') === 'development') {
	app.use(errorHandler());
}

// error handling middleware must be loaded after loading ALL other routes
app.use((err, req, res, next) => {
	// set statusCode and render 505 error page
	res.status(err.status || 500);
	res.render('500', { error: err });
	next(err);
});





//	START SERVER
// ==================================================

// create server
const server = http.createServer(app);

// listen
// start the server
server.listen(app.get('port'), () => {
	let host = server.address().address === '::' ? '127.0.0.1' : server.address().address;
	let port = server.address().port;
	console.log('listening at http://' + host + ':' + port);
});
