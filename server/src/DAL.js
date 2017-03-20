'use strict';

const http = require('http');
const mysql = require('mysql');
const sha = require('sha256');
const passGenerator = require('generate-password');
const nodemailer = require('nodemailer');
const fs = require('fs');
const pdf = require('html-pdf');

const Helpers = require('./helpers.js');
const MESSAGES = require('./messages.js');

const mail_server = nodemailer.createTransport('smtps://epasvaldiba%40gmail.com:rtupasvaldiba@smtp.gmail.com');
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

  getLocations(where) {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM Locations';
      if (where) sql += ' WHERE ' + where;

      this.connection.query(sql, (err, rows, fields) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  getList(type, id) {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT id, create_date, status, belongs_to FROM Requests';
      if (type == 'user') {
        sql += ' WHERE belongs_to = ' + id;

        this.connection.query(sql, (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        });
      } else {
        this._getEmployee(null, id).then(res => {
          sql += ' WHERE written_to = ' + res[0]['location_id'];

          this.connection.query(sql, (err, rows, fields) => {
            if (err) reject(err);
            else resolve(rows);
          });
        });
      }
    });
  }

  getMap(id) {
    return new Promise((resolve, reject) => {
      this._getEmployee(null, id).then(res => {
        let location_id = res[0]['location_id'];

        this.connection.query(REQUEST_MAP_SQL, (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        });
      });
    });
  }

  getRequest(requestID) {
    return new Promise((resolve, reject) => {
      let sql = REQUEST_SQL + ' AND id = ' + requestID;
      this.connection.query(sql, (err, rows, fields) => {
        if (err) reject(err);
        else {
          let result = {};
          let organizer = {};
          let guard = {};
          let social_guard = {};
          let support = {};
          for (let key in rows[0]) {
            if (key.startsWith('organizer_')) {
              organizer[key.substr(10)] = rows[0][key];
            } else if (key.startsWith('guard_')) {
              guard[key.substr(6)] = rows[0][key];
            } else if (key.startsWith('social_guard_')) {
              social_guard[key.substr(13)] = rows[0][key];
            } else if (key.startsWith('support_')) {
              support[key.substr(8)] = rows[0][key];
            } else {
              result[key] = rows[0][key];
            }
          }
          result['organizer'] = organizer;
          result['guard'] = guard;
          result['social_guard'] = social_guard;
          result['support'] = support;
          resolve(result);
        }
        ;
      });
    });
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
      // Get user from database by email
      this._getUser(email).then(res => {
          let promiseArr = [];
          let userId;
          let message;

          promiseArr.push(this._createPerson(request.organizer));
          promiseArr.push(this._createPerson(request.guard));
          promiseArr.push(this._createPerson(request.social_guard));
          promiseArr.push(this._createPerson(request.support));

          // get location name, to send it after with email
          promiseArr.push(this.getLocations('id = ' + request['location']));

          promiseArr.push(this._setCoordinates(request.address));

          // If user doesn't exist, then create it!
          if (res.length == 0) {
            promiseArr.push(this._createUser(email));
            message = 'NEW';
            // If user already exist, then use it id
          } else {
            userId = res[0]['id'];
            message = 'NEXT';
          }

          // Create in first Promise.all scope all persons and user if necessary
          Promise.all(promiseArr).then(res => {
              // In second scope create request and send email to user
              Promise.all([
                this._createRequest(request, res[0], res[1], res[2], res[3], res[5],
                  res.length == 7 ? res[6]['id'] : userId),
                this._sendEmail(email,
                  Helpers._replaceSubstr(
                    MESSAGES['CONST_REQUEST_' + message],
                    email,
                    res.length == 7 ? res[6]['pass'] : undefined,
                    request['description'],
                    res[4][0]['name']))
              ]).then(
                result => {
                  this._getEmployee(null, null, res[4][0]['id']).then(res =>
                    this._sendEmail(res[0]['email'],
                      Helpers._replaceSubstr(
                        MESSAGES['CONST_REQUEST_EMPLOYEE'],
                        null, null, request['description'])
                    ).then(res => resolve(res))
                  );
                },
                err => reject(err)
              )
            },
            err => reject(err));
        },
        err => reject(err));
    });
  }

  /**
   * Put request
   * @param
   * employee:String - employee id
   * user:String - user id
   * request:Object - request body
   * @WhatItDoes
   * Update request with employee decision and when send email to user
   */
  putRequest(employee, user, request) {
    return new Promise((resolve, reject) => {
      Promise.all([
        this._getUser(null, user),
        this._getEmployee(null, employee).then(
          res => this.getLocations('id = ' + res[0]['location_id']))
      ]).then(
        res => {
          let sql = 'UPDATE `Requests` SET status = "' + request['decision'] + '", checked_by = ' + employee;
          if (request.hasOwnProperty('callbackText')) {
            sql += ', gov_callback_text = "' + request['callbackText'] + '"';
          }

          sql += ' WHERE id = ' + request['id'];

          this.connection.query(sql, (err, rows, fields) => {
            if (err) reject(err);
            else {
              this.getRequest(request['id']).then(
                result => {
                  this._sendEmail(res[0][0]['email'],
                    request['decision'] == 'Apstiprināts' ?
                      Helpers._replaceSubstr(MESSAGES['REQUEST_APPROVED'], null, null, null, res[1][0]['name']) :
                      Helpers._replaceSubstr(MESSAGES['REQUEST_DECLINED'], null, null, null, res[1][0]['name']),
                    request['decision'] == 'Apstiprināts' ?
                      Helpers._replacePlchld(MESSAGES['REQUEST_APPROVED_FILE'], result, res[1][0]) :
                      Helpers._replacePlchld(MESSAGES['REQUEST_DECLINED_FILE'], result, res[1][0])
                  ).then(
                    res => resolve(rows),
                    err => reject(err)
                  )
                })
            }
          });
        },
        err => reject(err)
      )
    });
  }

  /**
   * Post login
   * @param
   * type:String - user type
   * email:String - user email
   * password:String - user password
   * @return
   * resolve:Object - object with authorized user from table `Users`
   * reject:Error - error message from database
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
              resolve({id: res[0]['id']});
            } else {
              reject({error: 'Nepareiza parole!'});
            }
          }
        },
        err => reject(err)
      )
    });
  }


  /** PRIVATE FUNCTIONS */

  /**
   * @param
   * email:String - user email
   * @return
   * resolve:Array<Object> - array with selected rows from table `Users`
   * reject:Error - error message from database
   * @WhatItDoes
   * Get user from database by email
   */
  _getUser(email, id) {
    return new Promise((resolve, reject) => {
      let where = '';
      if (id) where = ' WHERE id = "' + id + '"';
      else where = ' WHERE email = "' + email + '"';
      this.connection.query('SELECT * FROM `Users`' + where, (err, rows, fields) => {
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
  _getEmployee(email, id, locationId) {
    return new Promise((resolve, reject) => {
      let where = '';
      if (id) where = ' WHERE id = "' + id + '"';
      else if (email) where = ' WHERE email = "' + email + '"';
      else where = ' WHERE location_id = ' + locationId;
      this.connection.query('SELECT * FROM `Employees`' + where, (err, rows, fields) => {
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
        else resolve({id: rows.insertId, pass: password});
      })
    })
  }

  /**
   * @param
   * request:String - request body
   * organizerID:String - organizer foreign key
   * guardID:String - guard foreign key
   * socialGuardID:String - social guard foreign key
   * supportID:String - support foreign key
   * coordinatesID:String - coordinates foreign key
   * UserID:String - user foreign key
   * @return
   * resolve:Object - array with inserted rows
   * reject:Error - error message from database
   * @WhatItDoes
   * Insert request to database (final create request stage)
   */
  _createRequest(request, organizerID, guardID, socialGuardID, supportID, coordinatesID, UserID) {
    return new Promise((resolve, reject) => {
      request.organizer_id = organizerID;
      delete request.organizer;
      request.guard_id = guardID;
      delete request.guard;
      request.social_guard_id = socialGuardID;
      delete request.social_guard;
      request.support_id = supportID;
      delete request.support;
      request.coordinates_id = coordinatesID;
      request.belongs_to = UserID;

      request.written_to = request.location;
      delete request.location;

      request.status = 'Procesā';

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
        }
      });
    })
  }

  /**
   * Set coordinates to database
   * @param address
   * @returns {Promise<T>|Promise}
   * @private
   */
  _setCoordinates(address) {
    return new Promise((resolve, reject) => {
      this._getCoordinates(address).then(res => {
        if (res.constructor === Array) {
          let sql = 'INSERT INTO `Coordinates` (lat, long) VALUES ("' + res[0] + '","' + res[1] + '")';

          this.connection.query(sql, (err, rows, fields) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve(rows.insertId);
            }
          });
        } else {
          reject(res);
        }
      }, err => reject(err));
    });
  }

  /**
   * Get coordinates by address
   * @param address
   * @returns {Promise<T>|Promise}
   */
  _getCoordinates(address) {
    return new Promise((resolve, reject) => {
      if (typeof address == 'string') {
        let preparedAddress = address.replace(/\s+/g, '%20');

        let options = {
          host: 'nominatim.openstreetmap.org',
          path: '/search/' + preparedAddress + '?format=json&addressdetails=1&limit=1'
        };

        http.get(options, (res) => {
          let response = '';

          res.on('data', (chunk) => response += chunk);
          res.on('end', () => {
            let address = JSON.parse(response);
            if (address.length == 0) {
              reject('Address is not found');
            } else {
              let coordinates = [address[0]['lat'], address[0]['lon']];
              resolve(coordinates);
            }
          });
        });
      } else {
        reject('Address is not a string');
      }
    });
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

        let stream = fs.createWriteStream(PATH_TO_FILES + email + '.html');

        stream.once('open', (fd) => {
          stream.write(file);
          stream.end();
        });

        stream.on('finish', () => {
          let html = fs.readFileSync(PATH_TO_FILES + email + '.html', 'utf-8');

          pdf.create(html).toFile(PATH_TO_FILES + email + '.pdf', (err, res) => {
            if (err) {
              console.log(err)
            } else {
              mailOptions.attachments = [{filename: 'Oficiāls dokuments.pdf', path: PATH_TO_FILES + email + '.pdf'}];

              // send mail through mail_server
              mail_server.sendMail(mailOptions, (error, info) => {
                if (error) reject(error);
                else resolve('Message successfuly sent: ' + info.response);
              });
            }
          })
        });
      } else {
        // send mail through mail_server
        mail_server.sendMail(mailOptions, (error, info) => {
          if (error) reject(error);
          else resolve('Message successfuly sent: ' + info.response);
        });
      }
    });
  }
};

let REQUEST_MAP_SQL = `
SELECT 'id', 'description', 'address', 'start_date', 'start_time', 'end_date', 'end_time', 'status', 'org.*', 'coord.*', 'written_to'
FROM (SELECT Requests.coordinates_id, lat, 'long' FROM Requests, Coordinates WHERE (Requests.coordinates_id = Coordinates.id)) AS coord,
  (SELECT Requests.organizer_id,
          CONCAT(PhysicalPersons.name, " ", PhysicalPersons.surname) AS organizer_name,
          PhysicalPersons.person_code AS organizer_person_code,
          PhysicalPersons.address AS organizer_address,
          PhysicalPersons.phone AS organizer_phone
   FROM Requests,
        Persons,
        PhysicalPersons
   WHERE (organizer_id = Persons.id
          AND physical_person_id = PhysicalPersons.id)
   UNION SELECT Requests.organizer_id,
                LegalPersons.legal_name AS organizer_legal_name,
                LegalPersons.register_code AS organizer_register_code,
                LegalPersons.address AS organizer_address,
                LegalPersons.phone AS organizer_phone
   FROM Requests,
        Persons,
        LegalPersons
   WHERE (organizer_id = Persons.id
          AND legal_person_id = LegalPersons.id) ) AS org,
Requests
WHERE Requests.organizer_id = org.organizer_id
AND Requests.coordinates_id = coord.coordinates_id
AND Requests.written_to = ${location_id};
`;

const REQUEST_SQL = `
SELECT org.*,
       guard.*,
       soc.*,
       sup.*,
       Requests.*
FROM
  (SELECT Requests.organizer_id,
          CONCAT(PhysicalPersons.name, " ", PhysicalPersons.surname) AS organizer_name,
          PhysicalPersons.person_code AS organizer_person_code,
          PhysicalPersons.address AS organizer_address,
          PhysicalPersons.phone AS organizer_phone
   FROM Requests,
        Persons,
        PhysicalPersons
   WHERE (organizer_id = Persons.id
          AND physical_person_id = PhysicalPersons.id)
   UNION SELECT Requests.organizer_id,
                LegalPersons.legal_name AS organizer_legal_name,
                LegalPersons.register_code AS organizer_register_code,
                LegalPersons.address AS organizer_address,
                LegalPersons.phone AS organizer_phone
   FROM Requests,
        Persons,
        LegalPersons
   WHERE (organizer_id = Persons.id
          AND legal_person_id = LegalPersons.id) ) AS org,

  (SELECT Requests.guard_id,
          CONCAT(PhysicalPersons.name, " ", PhysicalPersons.surname) AS guard_name,
          PhysicalPersons.person_code AS guard_person_code,
          PhysicalPersons.address AS guard_address,
          PhysicalPersons.phone AS guard_phone
   FROM Requests,
        Persons,
        PhysicalPersons
   WHERE (guard_id = Persons.id
          AND physical_person_id = PhysicalPersons.id)
   UNION SELECT Requests.guard_id,
                LegalPersons.legal_name AS guard_legal_name,
                LegalPersons.register_code AS guard_register_code,
                LegalPersons.address AS guard_address,
                LegalPersons.phone AS guard_phone
   FROM Requests,
        Persons,
        LegalPersons
   WHERE (guard_id = Persons.id
          AND legal_person_id = LegalPersons.id) ) AS guard,

  (SELECT Requests.social_guard_id,
          CONCAT(PhysicalPersons.name, " ", PhysicalPersons.surname) AS social_guard_name,
          PhysicalPersons.person_code AS social_guard_person_code,
          PhysicalPersons.address AS social_guard_address,
          PhysicalPersons.phone AS social_guard_phone
   FROM Requests,
        Persons,
        PhysicalPersons
   WHERE (social_guard_id = Persons.id
          AND physical_person_id = PhysicalPersons.id)
   UNION SELECT Requests.social_guard_id,
                LegalPersons.legal_name AS social_guard_legal_name,
                LegalPersons.register_code AS social_guard_register_code,
                LegalPersons.address AS social_guard_address,
                LegalPersons.phone AS social_guard_phone
   FROM Requests,
        Persons,
        LegalPersons
   WHERE (social_guard_id = Persons.id
          AND legal_person_id = LegalPersons.id) ) AS soc,

  (SELECT Requests.support_id,
          CONCAT(PhysicalPersons.name, " ", PhysicalPersons.surname) AS support_name,
          PhysicalPersons.person_code AS support_person_code,
          PhysicalPersons.address AS support_address,
          PhysicalPersons.phone AS support_phone
   FROM Requests,
        Persons,
        PhysicalPersons
   WHERE (support_id = Persons.id
          AND physical_person_id = PhysicalPersons.id)
   UNION SELECT Requests.support_id,
                LegalPersons.legal_name AS support_legal_name,
                LegalPersons.register_code AS support_register_code,
                LegalPersons.address AS support_address,
                LegalPersons.phone AS support_phone
   FROM Requests,
        Persons,
        LegalPersons
   WHERE (support_id = Persons.id
          AND legal_person_id = LegalPersons.id) ) AS sup,
     Requests
WHERE Requests.organizer_id = org.organizer_id
  AND Requests.support_id = sup.support_id
  AND Requests.guard_id = guard.guard_id
  AND Requests.social_guard_id = soc.social_guard_id
`;