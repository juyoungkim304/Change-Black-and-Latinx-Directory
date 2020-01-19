var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var db = mysql.createConnection({
    host: 'blackalumnidirectory.cxs1kr4seklv.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'badg',
    password: 'blackalumni1',
    database: 'blackalumni'
});

db.connect((err) => {
    if (err) {
        console.log(err)
        throw err;
    }
    console.log("Connected to database...");
});
global.db = db;

const {profilePage} = require('./routes/profile.js');
const {searchPage} = require('./routes/searchresults.js');
const {editPage, editedPage} = require('./routes/editProfile.js');
const {addProfile, addedProfile} = require('./routes/addProfile.js');

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));


app.get('/', function(req, res) {
    console.log('Reached search-;landing.ejs');
    res.render('pages/search-landing');
});

app.get(/^\/profile\$(\d+)/, profilePage);

app.get(/^\/searchresults=([0-9]+)&(.*)/, searchPage);

app.get(/^\/addprofile/, addProfile);

app.post(/^\/addprofile/, addedProfile);

app.get(/^\/editprofile\$(\d+)/, editPage);

app.post(/^\/editprofile\$(\d+)/, editedPage);


app.listen('8080');
console.log("Listening at 8080...");
