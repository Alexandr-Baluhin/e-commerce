'use strict';

const mysql = require('mysql');
const sha = require('sha256');
const randomWord = require('random-word');
const nodemailer = require('nodemailer');

const MESSAGES = require('./messages.js');

const mail_server = nodemailer.createTransport('smtps://jn.riekp%40gmail.com:pasvaldiba@smtp.gmail.com');
const PATH_TO_FILES = 'files/';

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

    postRequest(request, email) {
        return new Promise((resolve, reject) => {
            let promiseArr = [];
            promiseArr.push(this._createPerson(request.organizer));
            promiseArr.push(this._createPerson(request.guard));
            promiseArr.push(this._createPerson(request.social_guard));
            promiseArr.push(this._createPerson(request.support));
            this._getUser(email).then(res => {
                if (res.length == 0) {
                    promiseArr.push(this._createUser(email));
                } else {
                    let userId = res;
                }

                Promise.all(promiseArr).then(res => {
                        this._createRequest(request, res[0], res[1], res[2], res[3],
                            res.length == 5 ? res[4] : userId).then(
                                res => resolve(res),
                                err => reject(err)
                            );
                    },
                    err => reject(err));
            },
            err => reject(err));
        });
    }

    postLogin(login, password) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM `Users` ')
        });
    }


    //private

    _getUser(email) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM `Users` WHERE email = "' + email + '"', (err, rows, fields) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    _createUser(email) {
        let password = randomWord();

        // generate salt and hash password for better security
        let salt = sha(Date.now().toString());
        let crypted_password = sha(salt + password);

        // this.sendEmail(email, MESSAGES.REQUEST_APPROVED);

        // TODO: write crypted_password and salt to DB
        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO `Users` (`email`,`password`) ' +
                'VALUES ("' + email + '","' + password + '");', (err, rows, fields) => {
                if (err) reject(err);
                else resolve(rows.insertId);
            })
        })
    }

    sendEmail(email, text, file) {

        var mailOptions = {
            from: '"Pašvaldība 👥" <jn.riekp@gmail.com>', // sender address
            to: email, // receiver
            subject: 'Publisko pasākumu organizēšanas atļauju izskatīšana', // subject
            html: text // email body
        };

        if (file) {
            mailOptions.attachments = [{ path: PATH_TO_FILES + file }]
        }

        // send mail through mail_server
        return new Promise((resolve, reject) => {
            mail_server.sendMail(mailOptions, (error, info) => {
                if (error) reject(error);
                else resolve('Message successfuly sent: ' + info.response);
            });
        });
    }

    /**
     * Is User and Organizer the same person?
     * */
    _createRequest(request, organizerID, guardID, socialGuardID, supportID, UserID) {
        return new Promise((resolve, reject) => {
            request.organizer_id = organizerID;
            delete request.organizer;
            request.guard_id = guardID;
            delete request.guard;
            request.social_guard_id = socialGuardID;
            delete request.social_guard;
            request.support_id = supportID;
            delete request.support;
            request.belongs_to = UserID;
            let sql = "INSERT INTO `Requests` (" + Object.keys(request).join(',') + ") " +
                " VALUES ('" + this._getValuesFromObject(request).join("','") + ");";
            this.connection.query(sql, (err, rows, fields) => {
                if (err) reject(err);
                else resolve(rows);
            })
        })
    }

    /**
     * Works for these fellas:
     *  guard
     *  organizer
     *  social_guard
     *  support
     * */
    _createPerson(person) {
        return new Promise((resolve, reject) => {
            let type = person.hasOwnProperty('legal_name') ? 'legal' : 'physical';

            let sql = "INSERT INTO `" + this._firstCharToUpperCase(type) + "Persons` (" + Object.keys(person).join(',') + ")" +
                " VALUES ('" + this._getValuesFromObject(person).join("','") + "');";

            this.connection.query(sql, (err, rows, fields) => {
                if (err) reject(err);
                else {
                    let sql = "INSERT INTO `Persons` (" + type + "_person_id" + ") VALUES ('" + rows.insertId + "')";
                    this.connection.query(sql, (err, rows, fields) => {
                        if (err) reject(err);
                        else resolve(rows.insertId);
                    });
                };
            });
        })
    }

    /**
    * e.g. testString -> TestString
    * */
    _firstCharToUpperCase(str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
    }

    _getValuesFromObject(obj) {
        let values = [];
        for (let key in obj) {
            values.push(obj[key]);
        }
        return values;
    }


};