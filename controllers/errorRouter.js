
//	IMPORT MODULES
// ==================================================
const express		= require('express');
const errorRouter	= express.Router();
const path			= require('path');
const appDir		= path.dirname(require.main.filename);





//	ROUTE ERRORS
// ==================================================

// 404
errorRouter.get('/404', function(req, res, next){
	// trigger a 404 since no other middleware
	// will match /404 after this one, and we're not responding here
	res.status(404);
	res.render('404', { url: req.url });
});

// 500
errorRouter.get('/500', function(req, res, next){
	// trigger a generic (500) error
	next(new Error('500: internal server error'));
});





//	ROUTE ERROR HANDLING
// ==================================================

// 404 (LAST middleware)
// since this is the last non-error-handling middleware,
// we assume 404, as nothing else responded.
errorRouter.use((req, res, next) => {
	res.sendFile(path.join(appDir + '/public/404.html'));
});





//	EXPORT MODULE
// ==================================================
module.exports = errorRouter;
