var express = require('express');
var app = express();
var fs = require('fs');
const port = process.env.PORT || 3001;
var bodyParser = require('body-parser');
const { render } = require('ejs');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// ejs asetetaan view engineksi
app.set('view engine', 'ejs');

// index sivu
app.get('/', function(req, res) {
    res.render('pages/index');
});

// guestbook sivu
app.get('/guestbook', function(req, res) {
    var jsondata = require('./sivupohja/data.json');
    res.render('pages/guestbook', {guestbook: jsondata});
});

// newmessage sivu
app.get('/newmessage', function(req,res) {
    res.render('pages/newmessage');
})
app.post('/newmessage', function(req, res) {
    console.log(req.body);
    var username = req.body.formname;
    var country = req.body.formcountry;
    var message = req.body.formmessage;
    var data = require('./sivupohja/data.json');

    data.push({
        "username": username,
        "country": country,
        "message": message,
        "date": new Date()
    });
    var jsonStr = JSON.stringify(data);
    fs.writeFile('./data.json', jsonStr, (err) => {
        if (err) throw err;
        console.log('It\'s saved!');
    });
    res.render('pages/newmessage');
});

// ajaxmessage sivu 
app.get('/ajaxmessage', function(req, res) {
    res.render('pages/ajaxmessage');
});

app.post('/ajaxmessage', function(req,res) {
    console.log(req.body);
    var username = req.body.formname;
    var country = req.body.formcountry;
    var message = req.body.formmessage;
    var data = require('./sivupohja/data.json');

    data.push({
        "username": username,
        "country": country,
        "message": message,
        "date": new Date()
    });
    var jsonStr = JSON.stringify(data);
    fs.writeFile('./data.json', jsonStr, (err) => {
        if (err) throw err;
        console.log('It\'s saved!');
    });

    res.render('pages/ajaxmessage');
})

app.listen(port);
console.log('Server is listening on port ' + port);