var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..')));

app.post('/email/:from/:to', function(req, res) {
	res.json({
		body: req.body,
		params: req.params
	});
});
app.put('/email/:from/:to', function(req, res) {
	res.send('Email Sent');
});

app.listen(3000);
console.log('Listening on port 3000');
