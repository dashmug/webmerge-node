'use strict';

const WebMergeAPI = require('.');


function promiseFromCallback(fn) {
  return new Promise((resolve, reject) => {
    fn((err, response) => {
      if (err) return reject(err);
      return resolve(response);
    });
  });
}


function promisify(fn, ...args) {
  return promiseFromCallback(cb => fn(...args, cb));
}


class WebMergePromiseAPI extends WebMergeAPI {
  mergeDocument(...args) {
    return promisify(super.mergeDocument, ...args);
  }

  createDocument(...args) {
    return promisify(super.createDocument, ...args);
  }

  updateDocument(...args) {
    return promisify(super.updateDocument, ...args);
  }

  getDocuments(...args) {
    return promisify(super.getDocuments, ...args);
  }

  getDocument(...args) {
    return promisify(super.getDocument, ...args);
  }

  getDocumentFields(...args) {
    return promisify(super.getDocumentFields, ...args);
  }
}


module.exports = WebMergePromiseAPI;
