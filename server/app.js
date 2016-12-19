'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const DAL = require('./DAL');

const https = require('https');
const fs = require('fs');
const busboy = require('connect-busboy');

var options = {
    key: fs.readFileSync('ssl/key.pem', 'utf8'),
    cert: fs.readFileSync('ssl/server.crt', 'utf8')
};

let database = new DAL();

app.use(bodyParser.json());
app.use(busboy());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,type,id");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS");
    next();
});

app.get('/', (req, res) => res.send('Hello from server!'));

app.get('/locations', (req, res) => {
    database.getLocations(null).then(
        result => res.send(result),
        err => res.send(err)
    );
});

app.get('/request/list', (req, res) => {
    let type = req.headers.type;
    let id = req.headers.id;
    database.getList(type, id).then(
        result => res.send(result),
        err => res.send(err)
    );
});

app.get('/request/:id', (req, res) => {
    let id = req.params.id;
    database.getRequest(id).then(
        result => res.send(result),
        err => res.send(err)
    )
});

app.post('/upload', (req, res) => {
    let stream;
    req.pipe(req.busboy);
    req.busboy.on('file', (fieldname, file, filename) => {
        stream = fs.createWriteStream(__dirname + '/files/' + filename);
        file.pipe(stream);
    });
    req.busboy.on('finish', () => {
      res.send('Done!');
    });
});

app.post('/request', (req, res) => {
    let request = req.body.request;
    let email = req.body.email;
    database.postRequest(request, email).then(
        result => res.send({ success: "Jūsu pieprasījums tiek saglabāts!" }),
        err => res.send({ error: "Jūsu pieprasījums netiek saglabāts!", message: err })
    )
});

app.put('/request', (req, res) => {
    let employee = req.body.employee;
    let user = req.body.user;
    let request = req.body.request;
    database.putRequest(employee, user, request).then(
        result => res.send({ success: "Jūsu lēmums tiek pieņemts!" }),
        err => res.send({ error: "Jūsu lēmums netiek pieņemts!", message: err })
    )
});

app.post('/login', (req, res) => {
    let type = req.body.type;
    let email = req.body.email;
    let password = req.body.password;

    database.postLogin(type, email, password).then(
        result => res.send(result),
        err => res.send(err)
    );
});

let httpsServer = https.createServer(options, app);

app.listen(8443, () => {
    database.test().then(
        res => {
            console.log('Connection with database established!');
            console.log('App listening on port 8443!');
        },
        err => {
            console.log('There ir error with database connection! Error: ' + err.code);
            console.log('App is closing');
            process.exit();
        });
});