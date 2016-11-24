'use strict';

module.exports = class HTMLGenerator {

    constructor() {
    }

    static createHeader(name, surname) {
        let result = "<header></header><h1>Hello " + name + " " + surname + "!</h1>";
        result += "<br>";
        result += "<p>You have successfully recieved a message from PPOA</p></header>";
        return result;
    }

};