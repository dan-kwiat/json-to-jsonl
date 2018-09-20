const fs = require('fs')

const getJSON = jsonFilename => {
  return require(jsonFilename)
}

const validateArray = arr => {
  if (!Array.isArray(arr)) {
    throw Error('Could not find array.')
  }
  return arr
}

const defaultGetArray = x => x

const writeJSONLines = (jsonFilename, getArray=defaultGetArray) => {
  const json = getJSON(jsonFilename)
  const arr = validateArray(getArray(json))
  const jsonlFilename = jsonFilename.replace(/.json/g, '.jsonl')
  const writeStream = fs.createWriteStream(jsonlFilename)
  arr.map(x => writeStream.write(`${JSON.stringify(x)}\n`))
  writeStream.end()
  return {
    lines: arr.length,
    file: jsonlFilename,
  }
}

module.exports = writeJSONLines
