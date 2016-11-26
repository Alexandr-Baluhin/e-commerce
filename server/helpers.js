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

    /**
     * Replace placeholders EMAIL, PASSWORD, LOCATION to their actual values
     */
    static _replaceSubstr(source, email, pass, location) {
        let newStr = source.replace(/(EMAIL)|(PASSWORD)|(LOCATION)/g, (match) => {
            switch (match) {
                case 'EMAIL':
                    return email;
                case 'PASSWORD':
                    return pass;
                case 'LOCATION':
                    return location;
            }
        });
        return newStr;
    }
};