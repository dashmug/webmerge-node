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


Usage
-----

Callback version
```js
const WebMergeAPI = require('webmerge').WebMergeAPI

const api = new WebMergeAPI(API_KEY, SECRET)

api.getDocuments({}, (error, result) => console.log(result))
```

Promise version
```js
const WebMergePromiseAPI = require('webmerge').WebMergePromiseAPI

const api = new WebMergePromiseAPI(API_KEY, SECRET)

api.getDocuments({}).then(console.log)
```

List of methods
---------------

TODO

License
-------
MIT © [Noel Martin Llevares](https://github.com/dashmug)
