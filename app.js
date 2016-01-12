var express = require('express');

var app = express();

// Connect to the database
var sql = require('mssql');
var config = {
    user: 'jon',
    password: '9Axchach',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'books_app',
};

sql.connect(config, function(){

});

var port = process.env.PORT || 5000;
var nav = [{
    Link: '/Books',
    Text: 'Book'
}, {
    Link: '/Authors',
    Text: 'Author'
}];
var bookRouter = require('./src/routes/bookRoutes.js')(nav);

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/Books', bookRouter)

app.get('/', function (req, res) {
    res.render('index',  {
        title: 'Index',
        nav: [{
            Link: '/Books',
            Text: 'Books'
        }, {
            Link: '/Authors',
            Text: 'Authors'
        }]
    });
});

console.log('running server on port ' + port);
app.listen(port, function (err) {
});
