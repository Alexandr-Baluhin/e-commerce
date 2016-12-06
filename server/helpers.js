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

    static _replacePlchld(source, request, location) {
        let result = source.replace(/\bPLCHLD_([a-zA-Z_]*)?\b/g, (match) => {
            let substr = '';
            try {
                switch (match) {
                    case 'PLCHLD_Location_name':
                        substr = location.name;
                        break;
                    case 'PLCHLD_Location_address':
                        substr = location.address;
                        break;
                    case 'PLCHLD_Location_city_loc':
                        substr = location.city_loc;
                        break;
                    case 'PLCHLD_Requests_checked_date':
                        substr = request.checked_date.slice(0, 10);
                        break;
                    case 'PLCHLD_Requests_id':
                        substr = request.id;
                        break;
                    case 'PLCHLD_Requests_create_date':
                        substr = request.create_date.slice(0, 10);
                        break;
                    case 'PLCHLD_Requests_organizer_name':
                        substr = request.organizer.name;
                        break;
                    case 'PLCHLD_Requests_organizer_code':
                        substr = request.organizer.person_code;
                        break;
                    case 'PLCHLD_Requests_organizer_address':
                        substr = request.organizer.address;
                        break;
                    case 'PLCHLD_Requests_description':
                        substr = request.description.replace(/↵/g, '<br>');
                        break;
                    case 'PLCHLD_Requests_address':
                        substr = request.address;
                        break;
                    case 'PLCHLD_Requests_support_name':
                        substr = request.support.name;
                        break;
                    case 'PLCHLD_Requests_support_code':
                        substr = request.support.person_code;
                        break;
                    case 'PLCHLD_Requests_support_address':
                        substr = request.support.address;
                        break;
                    case 'PLCHLD_Requests_social_guard_name':
                        substr = request.social_guard.name;
                        break;
                    case 'PLCHLD_Requests_social_guard_code':
                        substr = request.social_guard.person_code;
                        break;
                    case 'PLCHLD_Requests_social_guard_address':
                        substr = request.social_guard.address;
                        break;
                    case 'PLCHLD_Requests_dangerous':
                        substr = request.dangerous;
                        break;
                    case 'PLCHLD_Requests_start_date':
                        substr = request.start_date.slice(0, 10);
                        break;
                    case 'PLCHLD_Requests_start_time':
                        substr = request.start_time;
                        break;
                    case 'PLCHLD_Requests_finish_date':
                        substr = request.end_date.slice(0, 10);
                        break;
                    case 'PLCHLD_Requests_finish_time':
                        substr = request.end_time;
                        break;
                }
            } catch (e) {
                // Can not call function of null
                // return empty substr
            }
            return substr;
        });
        return result;
    }

};