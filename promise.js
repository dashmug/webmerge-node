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

  getDocumentFiles(...args) {
    return promiseFromCallback(cb => super.getDocumentFiles(...args, cb));
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

  getDataRoutes(...args) {
    return promiseFromCallback(cb => super.getDataRoutes(...args, cb));
  }

  getDataRoute(...args) {
    return promiseFromCallback(cb => super.getDataRoute(...args, cb));
  }

  getDataRouteFields(...args) {
    return promiseFromCallback(cb => super.getDataRouteFields(...args, cb));
  }

  getDataRouteRules(...args) {
    return promiseFromCallback(cb => super.getDataRouteRules(...args, cb));
  }

  mergeDataRoute(...args) {
    return promiseFromCallback(cb => super.mergeDataRoute(...args, cb));
  }

  createDataRoute(...args) {
    return promiseFromCallback(cb => super.createDataRoute(...args, cb));
  }

  updateDataRoute(...args) {
    return promiseFromCallback(cb => super.updateDataRoute(...args, cb));
  }

  deleteDataRoute(...args) {
    return promiseFromCallback(cb => super.deleteDataRoute(...args, cb));
  }
}


module.exports = WebMergePromiseAPI;
