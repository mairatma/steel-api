var express = require('express');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, '..')));

var response = [
	{
		"id": 1,
		"description": "Go to the grocery store",
		"creator": {
			"id": 2,
			"name": "Eduardo Lundgren"
		},
		"assignee": {
			"id": 3,
			"name": "Zeno Rocha"
		},
		"checked": true
	},
	{
		"id": 2,
		"description": "Watch Interstellar",
		"creator": {
			"id": 1,
			"name": "Brian Chan"
		},
		"assignee": {
			"id": 3,
			"name": "Zeno Rocha"
		},
		"checked": false
	}
];

app.post('/email', function(req, res) {
	res.json(response);
});
app.put('/email', function(req, res) {
	res.json(response);
});

app.listen(3000);
console.log('Listening on port 3000');
