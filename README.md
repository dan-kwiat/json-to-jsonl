# JSON to JSON Lines

You have a JSON file containing a very large array of objects you want to analyse.
`json-to-jsonl` is a lightweight package to re-write the array to a JSON Lines file - one row per object.

## JSON Lines Format

[JSON Lines](http://jsonlines.org/) is a convenient format for storing structured data that may be processed one record at a time. It works well with unix-style text processing tools and shell pipelines.  Here's how easy it is to create a document database (in MongoDB) from a JSON Lines file:
```
mongoimport --db my-db-name --collection my-collection-name --file /path/to/my-file.jsonl
```

## Installation
```
$ npm install --save json-to-jsonl
```

## Examples

```json5
// my-file-1.json
[
  { "a" : 1 },
  { "a" : 2 },
  { "a" : 3 }
]
// my-file-2.json
{
  "name" : "Some JSON Object",
  "longList" : [
    "one",
    "two",
    "three",
    "four"
  ]
}
```

```js
// convert.js
const jsonTojsonl = require('json-to-jsonl')

try {
  // The array is top-level in my-file-1.json so don't have to specify getArray func:
  const response1 = jsonTojsonl('my-file-1.json')
  // { lines: 3, file: 'my-file-1.jsonl' }

  // The array is a value in the my-file-2.json object so we have to specify a getArray func:
  const response2 = jsonTojsonl('my-file-2.json', x => x.longList)
  // { lines: 4, file: 'my-file-2.jsonl' }
}
catch (e) {
  ...
}
```

## Docs
```js
jsonTojsonl(jsonFilename, getArray=function(x) {return x})
```
Writes a new file with same name (but `.json` extension replaced with `.jsonl`).  The optional argument `getArray` allows you to define where the JSON array is (if it isn't top-level).
Returns an object with `lines` and `file` properties (number of lines written and name of new file).

## Memory Limit
If your JSON file is very big you might encounter a FATAL ERROR due to JavaScript heap out of memory.  It might be necessary to increase the memory usage limit when running your script, e.g. to 4GB:
```
$ node --max-old-space-size=4096 convert.js
```
