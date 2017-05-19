'use strict';

const WebMergeAPI = require('.');


const promiseFromCallback = fn => new Promise((resolve, reject) => {
  fn((err, response) => {
    if (err) return reject(err);
    return resolve(response);
  });
});


class WebMergePromiseAPI extends WebMergeAPI {
  getDocuments(options) {
    return promiseFromCallback(cb => super.getDocuments(options, cb));
  }

  getDocument(id) {
    return promiseFromCallback(cb => super.getDocument(id, cb));
  }

  getDocumentFields(id) {
    return promiseFromCallback(cb => super.getDocumentFields(id, cb));
  }

  getDocumentFiles(id) {
    return promiseFromCallback(cb => super.getDocumentFiles(id, cb));
  }

  createDocument(data) {
    return promiseFromCallback(cb => super.createDocument(data, cb));
  }

  updateDocument(id, data) {
    return promiseFromCallback(cb => super.updateDocument(id, data, cb));
  }

  mergeDocument(id, key, data, isTestMode, downloadFile) {
    return promiseFromCallback(cb => super.mergeDocument(id, key, data, isTestMode, downloadFile, cb));
  }

  copyDocument(id, data) {
    return promiseFromCallback(cb => super.copyDocument(id, data, cb));
  }

  deleteDocument(id) {
    return promiseFromCallback(cb => super.deleteDocument(id, cb));
  }

  getDataRoutes(callback) {
    return promiseFromCallback(cb => super.getDataRoutes(callback, cb));
  }

  getDataRoute(id) {
    return promiseFromCallback(cb => super.getDataRoute(id, cb));
  }

  getDataRouteFields(id) {
    return promiseFromCallback(cb => super.getDataRouteFields(id, cb));
  }

  getDataRouteRules(id) {
    return promiseFromCallback(cb => super.getDataRouteRules(id, cb));
  }

  mergeDataRoute(id, key, data, isTestMode, downloadFile) {
    return promiseFromCallback(cb => super.mergeDataRoute(id, key, data, isTestMode, downloadFile, cb));
  }

  createDataRoute(data) {
    return promiseFromCallback(cb => super.createDataRoute(data, cb));
  }

  updateDataRoute(id, data) {
    return promiseFromCallback(cb => super.updateDataRoute(id, data, cb));
  }

  deleteDataRoute(id) {
    return promiseFromCallback(cb => super.deleteDataRoute(id, cb));
  }
}


module.exports = WebMergePromiseAPI;
