'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const DAL = require('./DAL');

let database = new DAL();

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    database.test(res => {
        if (res == 2) {
            console.log('Connection with database established!');
            next();
        } else {
            console.log('There ir error with database connection!');
        }
    });
});

app.get('/', (req, res) => {
    // database.test(response => {
    //     res.send('From database - ' + response);
    // });
    database._getUser('anna@test.ru').then(
        result  => res.send(result),
        err     => res.send(err)
    );
});

app.get('/request/list', (req, res) => {
    //get list from DB
    database.getList('Procesā').then(
            result => res.send({lists: result}),
            err    => res.send({err: err})
    );
    //let lists = [
    //    {
    //        id: "101",
    //        create_date: "07.11.2016 12:00",
    //        status: "Procesā"
    //    },
    //    {
    //        id: "102",
    //        create_date: "01.11.2016 22:54",
    //        status: "Apstiprināts"
    //    },
    //    {
    //        id: "211",
    //        create_date: "05.10.2016 07:11",
    //        status: "Noraidīts"
    //    }
    //]
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
    let request = req.body.request;
    let email = req.body.email;
    database.postRequest(request, email).then(
            result => res.send({success: "Jūsu pieprasījums tiek saglabāts!"}),
            err => res.send({error: "Jūsu pieprasījums nētiek saglabāts!", message: err})
    )
});

app.post('/login', (req, res) => {
    // generate token
    let body = req.body.body;
    database.postLogin(body.email, body.password, body.type).then(
        result => res.send(resolve),
        err => res.send(err)
    );
    if (body.login == 'Jānis' && body.password == 'Grābis') {
        res.send({id: 1, type: body.type, token: "my_token"});
    } else {
        res.send({error: "Nepareizs lietotājvards vai pārole!"});
    }
});

app.listen(8080, () => {
    console.log('Example app listening on port 8080!');
});