'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const DAL = require('./DAL');

const https = require('https');
const fs = require('fs');

var options = {
    key: fs.readFileSync('./key.pem', 'utf8'),
    cert: fs.readFileSync('./server.crt', 'utf8')
};


let database = new DAL();

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get('/', (req, res) => res.send('Hello from server!'));

app.get('/locations', (req, res) => {
    // get locations from DB
    database.getLocations().then(
        result => res.send(result),
        err => res.send(err)
    );
});

app.get('/request/list', (req, res) => {
    // get list from DB
    database.getList('Procesā').then(
        result => res.send({ lists: result }),
        err => res.send({ err: err })
    );
});

app.get('/request/:id', (req, res) => {
    // get request from DB
    // TODO: format request
    database.getList(req.params.id).then(
        result => res.send({ data: result }),
        err => res.send({ err: err })
    )
});

app.post('/request', (req, res) => {
    let request = req.body.request;
    let email = req.body.email;
    database.postRequest(request, email).then(
        result => res.send({ success: "Jūsu pieprasījums tiek saglabāts!" }),
        err => res.send({ error: "Jūsu pieprasījums netiek saglabāts!", message: err })
    )
});

app.post('/login', (req, res) => {
    let type = req.body.type;
    let email = req.body.email;
    let password = req.body.password;
    console.log("post login")
    database.postLogin(type, email, password).then(
        result => res.send(result),
        err => res.send(err)
    );
});

let httpsServer = https.createServer(options, app);


httpsServer.listen(8080, () => {
    database.test().then(
        res => {
            console.log('Connection with database established!');
            console.log('App listening on port 8080!');
        },
        err => {
            console.log('There ir error with database connection! Error: ' + err.code);
            console.log('App is closing');
            process.exit();
        });
});