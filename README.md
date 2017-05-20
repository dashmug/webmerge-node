[![npm version](https://badge.fury.io/js/webmerge.svg)](https://badge.fury.io/js/webmerge)
[![Build Status](https://travis-ci.org/dashmug/webmerge-node.svg?branch=master)](https://travis-ci.org/dashmug/webmerge-node) 
[![Coverage Status](https://coveralls.io/repos/github/dashmug/webmerge-node/badge.svg?branch=master)](https://coveralls.io/github/dashmug/webmerge-node?branch=master)
![npm downloads](https://david-dm.org/dashmug/webmerge-node.svg)

WebMerge 
========

NodeJS library for using [WebMerge API](https://www.webmerge.me/developers).


Install
-------

    $ npm install webmerge --save


Authentication
--------------

In order to use WebMerge's API, you need to obtain an API key and secret from this 
[page](https://www.webmerge.me/manage/account?page=api).


Documentation (auto-generated from JSDoc)
-----------------------------------------

https://dashmug.github.io/webmerge-node/index.html (work-in-progress)


Usage
-----

Callback version
```js
const WebMergeAPI = require('webmerge').WebMergeAPI

const api = new WebMergeAPI(API_KEY, SECRET)

// Retrieve a specific document
api.getDocument(123456, (error, result) => console.log(result))
```

Promise version
```js
const WebMergePromiseAPI = require('webmerge').WebMergePromiseAPI

const api = new WebMergePromiseAPI(API_KEY, SECRET)

// Retrieve a specific document
api.getDocument(123456).then(console.log)
```

List of methods
---------------

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

Delete a document

License
-------
MIT © [Noel Martin Llevares](https://github.com/dashmug)
