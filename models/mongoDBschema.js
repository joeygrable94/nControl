
//	IMPORT MODULES
// ==================================================
const path			= require('path');
const appDir		= path.dirname(require.main.filename);
const mongoose		= require('mongoose');





//	connect to DB
// ==================================================
const db = mongoose.connection;

// test connection
// mongoose.connect('mongodb://localhost/test');

// error
db.on('error', (err) => {
	console.log('connection error:', err.message);
});

// open connection
db.once('open', () => {
	console.log("connected to MongoDB");
});





//	SCHEMA
// ==================================================
const Schema = mongoose.Schema;

// Images
const Images = new Schema({
	kind: {
		type: String,
		enum: ['thumbnail', 'detail'],
		required: true
	},
	url: { type: String, required: true }
});

// Articles
const Article = new Schema({
	title: { type: String, required: true },
	author: { type: String, required: true },
	description: { type: String, required: true },
	images: [Images],
	modified: { type: Date, default: Date.now }
});





//	VALIDATION
// ==================================================
Article.path('title').validate(function (v) {
	return v.length > 5 && v.length < 70;
});





//	MODELS
// ==================================================
const ArticleModel = mongoose.model('Article', Article);





//	EXPORT MODULES
// ==================================================
module.exports.ArticleModel = ArticleModel;
