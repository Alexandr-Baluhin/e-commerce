'use strict';
const express = require('express');
const app = express();
const DAL = require('./DAL');

let database = new DAL();

app.get('/', (req, res) => {
    database.test(response => {
        res.send('From database - ' + response);
    })
});

app.get('/request/list', (req, res) => {
    // get list from DB
    database.getList().then(
            result => res.send({data: result}),
            err    => res.send({err: err})
    )
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
    res.send('OK!')
});

app.post('/login', (req, res) => {
    // generate token
    res.send({token: "my_token"})
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});