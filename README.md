[![Build Status](https://travis-ci.org/dashmug/webmerge-node.svg?branch=master)](https://travis-ci.org/dashmug/webmerge-node) 
[![Coverage Status](https://coveralls.io/repos/github/dashmug/webmerge-node/badge.svg?branch=master)](https://coveralls.io/github/dashmug/webmerge-node?branch=master)
![npm downloads](https://david-dm.org/dashmug/webmerge-node.svg)

WebMerge 
========

Usage
-----
Callback version
```js
const WebMergeAPI = require('.')

const api = new WebMergeAPI(API_KEY, SECRET)

api.getDocuments({}, (error, result) => console.log(result))
```

Promise version
```js
const WebMergePromiseAPI = require('./promise')

const api = new WebMergePromiseAPI(API_KEY, SECRET)

api.getDocuments({}).then(console.log)
```
