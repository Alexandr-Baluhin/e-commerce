'use strict';
const assert = require('assert');
const sinon = require('sinon');
const DAL = require('../src/DAL');

describe('DAL', ()=> {

  describe('constructor', () => {
    it('should create DAL instance', () => {
      let dal = new DAL();

    });
  });
  describe('test', () => {
    it('should create DAL instance', () => {
      let dal = new DAL();
      dal.test().then((res) => assert(!!res));
    });
  });
  describe('getLocations', () => {
    it('should create DAL instance', (done) => {
      let dal = new DAL();
      dal.getLocations.query = () => {
        return true;
      };
      dal.getLocations().then(() => {
        done();
      });
    });
  });
  describe('getList', () => {
    it('should create DAL instance', () => {
      let dal = new DAL();
      dal.connection.query = () => {
        return true;
      };
      dal.getList();
      dal.getList('user');
    });
  });
  describe('getRequest', () => {
    it('should create DAL instance', () => {
      let dal = new DAL();
      dal.connection.query = (sql, fn) => {
        fn(null, [{
          organizer_id: '',
          guard_id: '',
          social_guard_id: '',
          support_id: '',
          some: ''
        }]);
        return true;
      };
      dal.getRequest();
    });
  });
  describe('postRequest', () => {
    it('should create DAL instance', () => {
      let dal = new DAL();
      dal.connection.query = (sql, fn) => {
        fn(null, [{
          organizer_id: '',
          guard_id: '',
          social_guard_id: '',
          support_id: '',
          some: ''
        }])
      };
      dal.postRequest({});
    });
  });
  describe('putRequest', () => {
    it('should create DAL instance', () => {
      let dal = new DAL();
      dal.connection.query = (sql, fn) => {
        fn(null, [{
          organizer_id: '',
          guard_id: '',
          social_guard_id: '',
          support_id: '',
          some: ''
        }])
      };
      dal.putRequest({}, {}, {});
    });
  });
  describe('postLogin', () => {
    it('should create DAL instance', () => {
      let dal = new DAL();
      dal._getSome = (sql, fn) => {
        return new Promise((resolve) => {
          resolve([{salt: '', password: '', id: ''}]);
        })
      };
      dal.postLogin('some', {}, {});
    });
  });
  describe('_createUser', () => {
    it('should create DAL instance', () => {
      let dal = new DAL();
      dal._getSome = (sql, fn) => {
        return new Promise((resolve) => {
          resolve([{salt: '', password: '', id: ''}]);
        })
      };
      dal._createUser('some');
    });
  });
  describe('_createRequest', () => {
    it('should create DAL instance', () => {
      let dal = new DAL();
      dal._getSome = (sql, fn) => {
        return new Promise((resolve) => {
          resolve([{salt: '', password: '', id: ''}]);
        })
      };
      dal._createRequest({}, '', '', '', '', '');
    });
  });
  describe('_createPerson', () => {
    it('should create DAL instance', () => {
      let dal = new DAL();
      dal.connection.query = (sql, fn) => {
        fn(null, [{
          organizer_id: '',
          guard_id: '',
          social_guard_id: '',
          support_id: '',
          some: ''
        }])
      };
      dal._createPerson({});
    });
  });

});
