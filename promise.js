'use strict';

const WebMergeAPI = require('.');


const promiseFromCallback = fn => new Promise((resolve, reject) => {
  fn((err, response) => {
    if (err) return reject(err);
    return resolve(response);
  });
});


class WebMergePromiseAPI extends WebMergeAPI {
  getDocuments(...args) {
    return promiseFromCallback(cb => super.getDocuments(...args, cb));
  }

  getDocument(...args) {
    return promiseFromCallback(cb => super.getDocument(...args, cb));
  }

  getDocumentFields(...args) {
    return promiseFromCallback(cb => super.getDocumentFields(...args, cb));
  }

  getDocumentFile(...args) {
    return promiseFromCallback(cb => super.getDocumentFile(...args, cb));
  }

  createDocument(...args) {
    return promiseFromCallback(cb => super.createDocument(...args, cb));
  }

  updateDocument(...args) {
    return promiseFromCallback(cb => super.updateDocument(...args, cb));
  }

  mergeDocument(...args) {
    return promiseFromCallback(cb => super.mergeDocument(...args, cb));
  }

  copyDocument(...args) {
    return promiseFromCallback(cb => super.copyDocument(...args, cb));
  }

  deleteDocument(...args) {
    return promiseFromCallback(cb => super.deleteDocument(...args, cb));
  }
}


module.exports = WebMergePromiseAPI;
