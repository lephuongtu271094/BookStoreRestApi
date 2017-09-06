const express = require('express');

const bodyParser = require('body-parser');
const port = 3000;
const { db, } = require('./pgp');

const home = require('./routes/home').home

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

home(app)


app.listen(port ,function () {
    console.log('app listen port : ' + port)
});


