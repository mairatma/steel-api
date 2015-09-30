var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..')));

app.post('/email/:from/:to', function(req, res) {
	var json = {
		body: req.body,
		params: req.params
	};
	for (var i = 0; i < 25; i++) {
		json['item' + i] = 'Item ' + i;
	}
	res.json(json);
});
app.put('/email/:from/:to', function(req, res) {
	res.send('Email Sent');
});

app.listen(3000);
console.log('Listening on port 3000');
