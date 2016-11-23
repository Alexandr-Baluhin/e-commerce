'use strict';

const mysql = require('mysql');
const sha = require('sha256');
const randomWord = require('random-word');
const nodemailer = require('nodemailer');

module.exports = class DAL {

    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'mydb'
        });
    }

    test(callback) {
        this.connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
            if (err) throw err;
            callback(rows[0].solution);
        });
    }

    // TODO: JOIN Persons and Requests
    getList(status, requestID) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT idRequests AS id, startDate AS create_date, gov_callback AS status FROM mydb.Requests " +
                "WHERE 1 = 1 ";
            if (status) sql += " AND Requests.gov_callback = '" + status + "'";
            if (requestID) sql += " AND Requests.idRequests = " + requestID;
            this.connection.query(sql, (err, rows, fields) => {
                if (err) reject(err);
                resolve(rows);
            })
        })
    }

    postRequest(request) {
        return new Promise((resolve, reject) => {
            let guardPromise = this.createPerson(request.guard);
            let organizerPromise = this.createPerson(request.organizer);
            let socialGuardPromise = this.createPerson(request.social_guard);
            let supportPromise = this.createPerson(request.support);
            let userPromise = this.createUser(request)
            Promise.all([guardPromise, organizerPromise, socialGuardPromise, supportPromise]).then(
                    res => {
                    return this.createRequest(request, res[0], res[1], res[2], res[3])
                }
            )
        })
    }


    //private

    createUser(email, login) {
        let password = randomWord();

        // generate salt and hash password for better security
        let salt = sha(Date.now().toString());
        let crypted_password = sha(salt + password);

        this.sendEmail(email, "You username is " + login + " and password is " + password);

        // TODO: write crypted_password and salt to DB
        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO `Users` (`email`,`username`,`password`) ' +
                'VALUES (' + email + ',' + login + ',' + password + ');', (err, rows, fields) => {
                if (err) reject(err);
                resolve(rows);
            })
        })
    }

    sendEmail(email, text) {
        // TODO: setup mail plugin
        var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

// setup e-mail data with unicode symbols
        var mailOptions = {
            from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
            to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world 🐴', // plaintext body
            html: '<b>Hello world 🐴</b>' // html body
        };

// send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    }

    /**
     * Is User and Organizer the same person?
     * */
    createRequest(request, guardID, organizerID, socialGuardID, supportID, UserID) {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO `Requests` " +
                "(`startTime`,`startDate`,`createDate`," +
                "`endTime`,`endDate`,`address`," +
                "`dangerous`,`gov_callback`,`participants`," +
                "`visitors`,`organizer_id`,`social_guard_id`," +
                "`support_id`,`checked_by`,`belongs_to`) " +
                "VALUES ('" + request.start_time + "','" + request.start_date + "','" + Date.now() + "'," +
                "'" + request.end_time + "','" + request.end_date + "','" + request.address + "'," +
                "'" + request.dangerous + "','" + request.gov_callback + "'," + request.participiants + "," +
                request.visitors + "," + organizerID + "," + socialGuardID + "," +
                supportID + ",null," + UserID + ");";
            this.connection.query(sql, (err, rows, fields) => {
                if (err) reject(err);
                resolve(rows);
            })
        })
    }

    /**
     * Works for these fellas:
     *  guard
     *  organizer
     *  social_guard
     *  support
     *
     * */
    createPerson(person) {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO `Persons` " +
                "(`address`,`name`,`surname`,`person_code`,`phone`) " +
                "VALUES ('" + person.address + "','" + person.name + "','" +
                person.surname + "','" + person.code + "','" + person.phone + "');";
            this.connection.query(sql, (err, rows, fields) => {
                if (err) reject(err);
                resolve(rows);
            })
        })
    }


};