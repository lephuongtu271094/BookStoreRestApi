const express = require('express');

const bodyParser = require('body-parser');
const port = 3000;
const { db, } = require('./pgp');

const home = require('./routes/home').home

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req,res, next) => {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
})

home(app)


app.listen(port ,function () {
    console.log('app listen port : ' + port)
});


