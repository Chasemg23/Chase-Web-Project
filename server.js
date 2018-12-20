var express = require("express");
var app = express();
app.set('view engine', 'pug');
app.set('views','./views');

app.route('/')
	.get(function (req, res) {
		res.render('index', {title: "GET", message: "You fucked a GET request"});
		res.end();
	})



app.listen("80", function() {
	console.log("Server running on port 80");
});
