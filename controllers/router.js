
//	IMPORT MODULES
// ==================================================
const express		= require('express');
const router		= express.Router();
const path			= require('path');
const appDir		= path.dirname(require.main.filename);





//	ROUTES
// ==================================================

// Home route
router.get('/', (req, res, next) => {
	res.sendFile(path.join(appDir + '/public/index.html'));
});





//	EXPORT MODULE
// ==================================================
module.exports = router;
