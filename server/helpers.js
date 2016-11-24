'use strict';

module.exports = class Helpers {
    
    /**
    * e.g. testString -> TestString
    * */
    static _firstCharToUpperCase(str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
    }

    static _getValuesFromObject(obj) {
        let values = [];
        for (let key in obj) {
            values.push(obj[key]);
        }
        return values;
    }
}