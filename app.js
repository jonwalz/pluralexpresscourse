var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var port = process.env.OPENSHIFT_NODEJS_PORT || 5000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1''';

// Mongo string for openshift

mongodb_connection_string = 'mongodb://127.0.0.1:27017/libraryApp;


var nav = [{
    Link: '/Books',
    Text: 'Books'
}];
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));

require('./src/config/passport')(app);

app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function (req, res) {
    res.render('index',  {
        title: 'Index',
        nav: [{
            Link: '/Books',
            Text: 'Books'
        }]
    });
});

console.log('running server on port ' + port);
app.listen(port, server_ip_address, function (err) {
});

if(process.env.OPENSHIFT_MONGODB_DB_URL){
    mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + 'libraryApp';
}