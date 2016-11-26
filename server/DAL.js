'use strict';

const mysql = require('mysql');
const sha = require('sha256');
const passGenerator = require('generate-password');
const nodemailer = require('nodemailer');

const Helpers = require('./helpers.js');
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

    /** Test function to check database connection */
    test() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
                if (err) reject(err);
                else resolve(rows[0].solution);
            });
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

    /**
     * Post request
     * @param
     * request:Object - request body
     * email:String - user email
     * @WhatItDoes
     * Step-by-step post request to database and when send email to user
     */
    postRequest(request, email) {
        return new Promise((resolve, reject) => {
            let promiseArr = [];
            promiseArr.push(this._createPerson(request.organizer));
            promiseArr.push(this._createPerson(request.guard));
            promiseArr.push(this._createPerson(request.social_guard));
            promiseArr.push(this._createPerson(request.support));

            // Get user from database by email
            this._getUser(email).then(res => {
                let userId;
                let message;

                // If user doesn't exist, then create it!
                if (res.length == 0) {
                    promiseArr.push(this._createUser(email));
                    message = 'FIRST';
                // If user already exist, then use it id
                } else {
                    userId = res[0]['id'];
                    message = 'NEXT';
                }

                // Create in first Promise.all scope all persons and user if necessary
                Promise.all(promiseArr).then(res => {
                    // In second scope create request and send email to user
                    Promise.all([
                        this._createRequest(request, res[0], res[1], res[2], res[3],
                            res.length == 5 ? res[4]['id'] : userId),
                        this._sendEmail(email,
                            Helpers._replaceSubstr(MESSAGES['REQUEST_SUBMITTED_' + message], email, 
                            res.length == 5 ? res[4]['pass'] : undefined, 'Rīgas pašvaldība'))
                    ]).then(
                        res => resolve(res),
                        err => reject(err)
                    )
                },
                err => reject(err));
            },
            err => reject(err));
        });
    }

    /**
     * Post login
     * @param
     * type:String - user type
     * email:String - user email
     * password:String - user password
     * @WhatItDoes
     * Check if user exist and then check his password
     */
    postLogin(type, email, password) {
        return new Promise((resolve, reject) => {
            this['_get' + Helpers._firstCharToUpperCase(type.toLowerCase())](email).then(
                res => {
                    if (res.length == 0) {
                        reject({error: 'Lietotājs nēeksistē!'});
                    } else {
                        let crypted_password = sha(res[0]['salt'] + password);
                        if (crypted_password == res[0]['password']) {
                            // TODO: do we need token?
                            resolve({ id: res[0]['id'], token: "my_token" });
                        } else {
                            reject({error: 'Nepareiza parole!'});
                        }
                    }
                },
                err => reject(err)
            )
        });
    }


    /** Private functions */

    /**
     * @param
     * email:String - user email
     * @return
     * resolve:Array<Object> - array with selected rows from table `Users`
     * reject:Error - error message from database
     * @WhatItDoes
     * Get user from database by email
     */
    _getUser(email) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM `Users` WHERE email = "' + email + '"', (err, rows, fields) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    /**
     * @param
     * email:String - user email
     * @return
     * resolve:Array<Object> - array with selected rows from table `Employees`
     * reject:Error - error message from database
     * @WhatItDoes
     * Get employee from database by email
     */
    _getEmployee(email) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM `Employees` WHERE email = "' + email + '"', (err, rows, fields) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    /**
     * @param
     * email:String - user email
     * @return
     * resolve:Object - object with new user id and it "plain" password (to send it after to user email)
     * reject:Error - error message from database
     * @WhatItDoes
     * Create user and insert it in database
     */
    _createUser(email) {
        // generate password
        let password = passGenerator.generate({
            numbers: true,
            strict: true
        });

        // generate salt and hash password for better security
        let salt = sha(Date.now().toString());
        let crypted_password = sha(salt + password);

        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO `Users` (email,password,salt) ' +
                'VALUES ("' + email + '","' + crypted_password + '","' + salt + '");', (err, rows, fields) => {
                    if (err) reject(err);
                    else resolve({ id: rows.insertId, pass: password });
                })
        })
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

            /** TODO: make files processed 
            *  Hack for mysql, because field 'files' in the schema can't be null 
            * */
            request.files = '1.txt';

            let sql = "INSERT INTO `Requests` (" + Object.keys(request).join(',') + ")" +
                " VALUES ('" + Helpers._getValuesFromObject(request).join("','") + "');";

            this.connection.query(sql, (err, rows, fields) => {
                if (err) reject(err);
                else resolve(rows);
            })
        })
    }

    /**
     * @param
     * person:Object - object with specific person data
     * @return
     * resolve:Number - new created person id
     * reject:Error - error message from database
     * @WhatItDoes
     * Create persons for request
     * Works for these fellas:
     *  guard
     *  organizer
     *  social_guard
     *  support
     * */
    _createPerson(person) {
        return new Promise((resolve, reject) => {
            let type = person.hasOwnProperty('legal_name') ? 'legal' : 'physical';

            let sql = "INSERT INTO `" + Helpers._firstCharToUpperCase(type) + "Persons` (" + Object.keys(person).join(',') + ")" +
                " VALUES ('" + Helpers._getValuesFromObject(person).join("','") + "');";

            this.connection.query(sql, (err, rows, fields) => {
                if (err) {
                    reject(err);
                } else {
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
     * @param
     * email:String - receiver email address
     * text:String - email text
     * file:String - filename in folder 'files', which need to be attached to email
     * @return
     * resolve:String - succesful response from server
     * reject:Error - error message from SMTP server
     * @WhatItDoes
     * Send email to specific address from 'jn.riekp@gmail.com'
     * Need to be send in 2 situations:
     *  * when user created a new request
     *  * when request status changed (approved or not)
     * */
    _sendEmail(email, text, file) {
        return new Promise((resolve, reject) => {
            let mailOptions = {
                from: '"Pašvaldība 👥" <jn.riekp@gmail.com>', // sender address
                to: email, // receiver
                subject: 'Publisko pasākumu organizēšanas atļauju izskatīšana', // subject
                html: text // email body
            };

            if (file) {
                mailOptions.attachments = [{ path: PATH_TO_FILES + file }]
            }

            // send mail through mail_server
            mail_server.sendMail(mailOptions, (error, info) => {
                if (error) reject(error);
                else resolve('Message successfuly sent: ' + info.response);
            });
        });
    }
};