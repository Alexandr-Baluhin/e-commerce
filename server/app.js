'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const DAL = require('./DAL');

let database = new DAL();

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get('/', (req, res) => {
    database.test(response => {
        res.send('From database - ' + response);
    })
});

app.get('/request/list', (req, res) => {
    // get list from DB
    // database.getList().then(
    //         result => res.send({data: result}),
    //         err    => res.send({err: err})
    // )
    let lists = [
        {
            id: "101",
            create_date: "07.11.2016 12:00",
            status: "Procesā"
        },
        {
            id: "102",
            create_date: "01.11.2016 22:54",
            status: "Apstiprināts"
        },
        {
            id: "211",
            create_date: "05.10.2016 07:11",
            status: "Noraidīts"
        }
    ]
    res.send(lists);
});

app.get('/request/:id', (req, res) => {
    // get request from DB
    // TODO: format request
    database.getList(req.params.id).then(
            result => res.send({data: result}),
            err    => res.send({err: err})
    )
});

app.post('/request', (req, res) => {
    // parse req.body
    // write new request to DB
    console.log(req.body);
    /**
    *   Response object must have success key or error key!
    *   e.g. success
    *   res.send({ success: "Jūsu pieprasījums tiek saglabāts!"});
    *   error
    *   res.send({ error: "Jūsu pieprasījums nētiek saglabāts!"});
    */
    res.send({ success: "Jūsu pieprasījums tiek saglabāts!"});
});

app.post('/login', (req, res) => {
    // generate token
    let body = req.body.body;
    if (body.login == 'Jānis' && body.password == 'Grābis') {
        res.send({id: 1, type: body.type, token: "my_token"});
    } else {
        res.send({error: "Nepareizs lietotājvards vai pārole!"});
    }
});

app.listen(8080, () => {
    console.log('Example app listening on port 8080!');
});