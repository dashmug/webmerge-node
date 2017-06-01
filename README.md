[![npm version](https://badge.fury.io/js/webmerge.svg)](https://badge.fury.io/js/webmerge)
[![Build Status](https://travis-ci.org/dashmug/webmerge-node.svg?branch=master)](https://travis-ci.org/dashmug/webmerge-node) 
[![Coverage Status](https://coveralls.io/repos/github/dashmug/webmerge-node/badge.svg?branch=master)](https://coveralls.io/github/dashmug/webmerge-node?branch=master)
[![dependencies Status](https://david-dm.org/dashmug/webmerge-node/status.svg)](https://david-dm.org/dashmug/webmerge-node)
[![devDependencies Status](https://david-dm.org/dashmug/webmerge-node/dev-status.svg)](https://david-dm.org/dashmug/webmerge-node?type=dev)

WebMerge 
========

NodeJS wrapper library for using [WebMerge API](https://www.webmerge.me/developers).


Install
-------

    $ npm install webmerge --save
    
or with `yarn`...

    $ yarn add webmerge


Authentication
--------------

In order to use WebMerge's API, you need to obtain an API key and secret from this 
[page](https://www.webmerge.me/manage/account?page=api).


Documentation (auto-generated from JSDoc)
-----------------------------------------

https://dashmug.github.io/webmerge-node/index.html (work-in-progress)


Usage Examples
--------------

### Callback version
```js
const WebMergeAPI = require('webmerge').WebMergeAPI

const api = new WebMergeAPI(API_KEY, SECRET)

// Retrieve a specific document
api.getDocument(123456, (error, result) => console.log(result))
```

### Promise version

Using native Promise,

```js
const WebMergePromiseAPI = require('webmerge').WebMergePromiseAPI

const api = new WebMergePromiseAPI(API_KEY, SECRET)

// Retrieve a specific document
api.getDocument(123456).then(console.log)
```

Using [Bluebird](http://bluebirdjs.com/docs/getting-started.html),

```js
const Promise = require('bluebird')
const WebMergePromiseAPI = require('webmerge').WebMergePromiseAPI

const api = new WebMergePromiseAPI(API_KEY, SECRET, Promise)

// Retrieve a specific document
api.getDocument(123456).then(console.log)
```

List of methods
---------------

See [documentation](https://dashmug.github.io/webmerge-node/index.html) for more information.

#### `new WebMergeAPI(key, secret)`

Create an API client that uses callbacks.

#### `new WebMergeAPI(key, secret, [PromiseImplementation])`

Create an API client that uses Promises. 
Optionally, you may specify which Promise implementation to use (e.g. bluebird).
Defaults to using Native Promises.


### Documents

WebMerge REST API Reference: https://www.webmerge.me/developers/documents

#### `mergeDocument(id, key, data, isTestMode, downloadFile, callback)`

Merge a document.

#### `createDocument(data, callback)`

Create a new document. Depending on the type of document you are creating, different parameters are required

#### `updateDocument(id, data, callback)`
     
Update a document. You cannot change the type of document, but you can change many of the other settings as well as 
change the contents of the document. Only parameters that are sent in the request will be updated.

#### `getDocuments(options, callback)`

Retrieve a list of documents.

#### `getDocument(id, callback)`

Retrieve a specific document.

#### `getDocumentFields(id, callback)`

Retrieve a list of fields for a specific document.

#### `getDocumentFiles(id, callback)`

Retrieve the file that was uploaded for a specific document (pdf, docx, xlsx, or pptx).

#### `copyDocument(id, data, callback)`

Create a copy of a document.

#### `deleteDocument(id, callback)`

Delete a document.


### Data Routes

WebMerge REST API Reference: https://www.webmerge.me/developers/routes

#### `mergeDataRoute(id, key, data, isTestMode, downloadFile, callback)`

Merge a data route.

#### `createDataRoute(data, callback)`

Create a new data route.

#### `updateDataRoute(id, data, callback)`

Update a data route.

#### `getDataRoutes(callback)`

Retrieve a list of data routes.

#### `getDataRoute(id, callback)`

Retrieve a specific data route.

#### `getDataRouteFields(id, callback)`

Retrieve a list of fields for a specific data route. This includes fields from all documents in routing rules.

#### `getDataRouteRules(id, callback)`

Retrieve a list of rules for a specific data route.
 
#### `deleteDataRoute(id, callback)`

Delete a data route.


### Tools

WebMerge REST API Reference: https://www.webmerge.me/developers/tools

#### `combineFiles(data, callback)`
     
Combine multiple files (pages) into a single file.

#### `convertToPDF(data, callback)`

Convert file to PDF


License
-------
MIT © [Noel Martin Llevares](https://github.com/dashmug)
