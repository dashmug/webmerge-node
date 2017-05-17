'use strict';

const WebMergeAPI = require('.');


const promiseFromCallback = fn => new Promise((resolve, reject) => {
  fn((err, response) => {
    if (err) return reject(err);
    return resolve(response);
  });
});


class WebMergePromiseAPI extends WebMergeAPI {
  mergeDocument(...args) {
    return promiseFromCallback(cb => super.mergeDocument(...args, cb));
  }

  createDocument(...args) {
    return promiseFromCallback(cb => super.createDocument(...args, cb));
  }

  updateDocument(...args) {
    return promiseFromCallback(cb => super.updateDocument(...args, cb));
  }

  getDocuments(...args) {
    return promiseFromCallback(cb => super.getDocuments(...args, cb));
  }

  getDocument(...args) {
    return promiseFromCallback(cb => super.getDocument(...args, cb));
  }

  getDocumentFields(...args) {
    return promiseFromCallback(cb => super.getDocumentFields(...args, cb));
  }
}


module.exports = WebMergePromiseAPI;
