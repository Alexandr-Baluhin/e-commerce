'use strict';

const mysql = require('mysql');

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
    getList(requestID) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM mydb.Users, mydb.Persons, mydb.Employees, mydb.Requests " +
                "WHERE Requests.belongs_to = Users.UserId";
            if (requestID) sql += " AND Requests.idRequests = " + requestID + ";";
            this.connection.query(sql, (err, rows, fields) => {
                if (err) reject(err);
                resolve(rows);
            })
        })
    }


    //private

    createUser(user) {
        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO `Users` (`email`,`username`,`password`) ' +
                'VALUES (' + user.email + ',' + user.login + ',' + user.password + ');', (err, rows, fields) => {
                if (err) reject(err);
                resolve(rows);
            })
        })
    }

    createRequest(request) {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO `Requests` " +
                "(`startTime`,`startDate`,`endTime`,`address`,`dangerous`,`gov_callback`," +
                "`participants`,`visitors`,`organizer_id`,`social_guard_id`,`support_id`,`checked_by`,`belongs_to`) " +
                "VALUES ('2','3','4','5','6','7',8,9,0,1,2,3,4);";
            this.connection.query(sql, (err, rows, fields) => {
                if (err) reject(err);
                resolve(rows);
            })
        })
    }

    createPerson(erson) {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO `Persons` " +
                "(`idPersons`,`address`,`name`,`surname`,`person_code`,`phone`) " +
                "VALUES (1,'2','3','4','5','6');";
            this.connection.query(sql, (err, rows, fields) => {
                if (err) reject(err);
                resolve(rows);
            })
        })
    }


};