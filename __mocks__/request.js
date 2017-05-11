'use strict';

const request = jest.genMockFromModule('request');

request.defaults = jest.fn(() => ({
  get: jest.fn((opts, callback) => callback(null, {}, {})),
}));

module.exports = request;
