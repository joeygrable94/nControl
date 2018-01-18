
//	IMPORT MODULES
// ==================================================
const express		= require('express');
const router		= express.Router();
const path			= require('path');
const appDir		= path.dirname(require.main.filename);





//	IMPORT DATABASE
// ==================================================
const CRUD			= require(path.join(appDir + '/models/CRUD'));
const mongo			= require(path.join(appDir + '/models/mongoDBschema'));


// load model dynamicalls (check exists)
//let ArticleModel	= require(path.join(appDir + '/models/mongoDBschema').ArticleModel);





//	ROUTES
// ==================================================

// home
router.get('/', (req, res, next) => {
	res.send('API BASE');
});

// info
router.get('/info', (req, res, next) => {
	res.send('API running...');
});





//	CRUD
// ==================================================
// router.get('/create/',		function() {});
// router.get('/read/', 		function() {});
// router.get('/update/',		function() {});
// router.get('/delete/',		function() {});

// read
router.get('/read/:id', (req, res, next) => {
	
	// check request
	// console.log(req);

	// get id
	let id = req.params['id'];

	// do something
	res.json({ 'CRUD': 'read ' + id });

});




//	EXPORT MODULE
// ==================================================
module.exports = router;
