'use strict';
const express = require('express');
const app = express();
const mysql = require('mysql');
const DAL = require('./DAL');

let database = new DAL();

app.get('/', (req, res) => {
    database.test(response => {
        res.send('From database - ' + response);
    })
});

app.get('/request/list', (req, res) => {
    // get list from DB
    // format list
    res.send({data: "Listing"});
});

app.get('/request/:id', (req, res) => {
    // get request from DB
    // format request
    res.send({data: "Request"});
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