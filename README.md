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
