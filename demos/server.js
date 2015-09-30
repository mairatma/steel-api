var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var http = require('http');

var app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..')));

var data = [];
app.post('/email/:from/:to', function(req, res) {
	data.push({
		from: req.params.from,
		to: req.params.to
	});
	io.emit('changes', data);

	var json = {
		body: req.body,
		params: req.params
	};
	// Increase the response size.
	for (var i = 0; i < 25; i++) {
		json['item' + i] = 'Item ' + i;
	}
	res.json(json);
});
app.put('/email/:from/:to', function(req, res) {
	res.send('Email Sent');
});

var server = http.Server(app);
var io = require('socket.io')(server, {
	path: '/email/liferay/:to'
});

server.listen(3000, function() {
	console.log('Listening on port 3000');
});
