'use strict';

const assert = require('assert');
const sinon = require('sinon');
const Helpers = require('../src/helpers');

describe('Helpers', ()=> {

  describe('_firstCharToUpperCase', () => {
    it('should create DAL instance', () => {
      assert(Helpers._firstCharToUpperCase('test') == 'Test');
    });
  });

  describe('_getValuesFromObject', () => {
    it('should create DAL instance', () => {
      assert(!!Helpers._getValuesFromObject({foo: 'bar'}));
    });
  });

  describe('_replaceSubstr', () => {
    it('should create DAL instance', () => {
      assert(Helpers._replaceSubstr('EMAIL', 'Test') == 'Test');
      assert(Helpers._replaceSubstr('PASSWORD', null, 'Test') == 'Test');
      assert(Helpers._replaceSubstr('DESCRIPTION', null, null, 'Test') == 'Test');
      assert(Helpers._replaceSubstr('LOCATION', null, null, null, 'Test') == 'Test');
      assert(!!Helpers._replaceSubstr('DATE'));
    });
  });

  describe('_replacePlchld', () => {
    it('should replace placeholders', () => {
      assert(!Helpers._replacePlchld('PLCHLD_Location_name'), {}, {});
      assert(!Helpers._replacePlchld('PLCHLD_Location_address'), {}, {});
      assert(!Helpers._replacePlchld('PLCHLD_Location_city_loc'), {}, {});
      assert(!Helpers._replacePlchld('PLCHLD_Requests_checked_date'), {}, {});
      assert(!Helpers._replacePlchld('PLCHLD_Requests_id'), {}, {});
      assert(!Helpers._replacePlchld('PLCHLD_Requests_create_date'), {}, {});
      assert(!Helpers._replacePlchld('PLCHLD_Requests_organizer_name'), {}, {});
      assert(!Helpers._replacePlchld('PLCHLD_Requests_organizer_code'), {}, {});
      assert(!Helpers._replacePlchld('PLCHLD_Requests_organizer_address'), {}, {});
      assert(!Helpers._replacePlchld('PLCHLD_Requests_description'), {}, {});
      assert(!Helpers._replacePlchld('PLCHLD_Requests_address'), {}, {});
      assert(!Helpers._replacePlchld('PLCHLD_Requests_support_name'), {}, {});
      assert(!Helpers._replacePlchld('PLCHLD_Requests_support_code'), {}, {});
      assert(!Helpers._replacePlchld('PLCHLD_Requests_support_address'), {}, {});
      assert(!Helpers._replacePlchld('PLCHLD_Requests_social_guard_name'), {}, {});
      assert(!Helpers._replacePlchld('PLCHLD_Requests_social_guard_code'), {}, {});
      assert(!Helpers._replacePlchld('PLCHLD_Requests_social_guard_address'), {}, {});
      assert(!Helpers._replacePlchld('PLCHLD_Requests_dangerous'), {}, {});
      assert(!Helpers._replacePlchld('PLCHLD_Requests_start_date'), {}, {});
      assert(!Helpers._replacePlchld('PLCHLD_Requests_start_time'), {}, {});
      assert(!Helpers._replacePlchld('PLCHLD_Requests_finish_date'), {}, {});
      assert(!Helpers._replacePlchld('PLCHLD_Requests_finish_time'), {}, {});

    });
  });

});

