var express = require('express');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, '..')));

app.get('/data', function(req, res) {
	res.json({
		foo: 'bar'
	});
});

app.listen(3000);
console.log('Listening on port 3000');
