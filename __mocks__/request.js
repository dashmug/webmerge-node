'use strict'

const request = jest.genMockFromModule('request')

request.defaults = jest.fn(() => ({
  get: jest.fn((opts, callback) => callback(null, {}, {})),
  post: jest.fn((opts, callback) => callback(null, {}, {})),
  put: jest.fn((opts, callback) => callback(null, {}, {})),
}))

module.exports = request
