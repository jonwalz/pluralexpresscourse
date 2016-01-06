var express = require('express');
var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public'));
app.set('views', 'src/views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
    res.send('Hello Hello');
});

app.listen(port, function (err) {
    console.log('Server is running on port: ' + port);
});