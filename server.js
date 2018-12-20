var express = require("express");
var fs = require("fs");
var url = require("url");
var path = require("path");
var http = require('http');
var app = express();
app.use( express.static( __dirname));
//app.set('view engine', 'pug');
//app.set('views','./views');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/index.html'));
});

app.get('/html/logic_simulator.html', function(req, res){
	res.sendFile(path.join(__dirname + "/html/logic_simulator.html"));
});



app.listen("7000", function() {
	console.log("Server running on port 7000");
});
