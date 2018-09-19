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

const writeJSONLines = (jsonFilename, getArray) => {  
  const json = getJSON(jsonFilename)
  const arr = validateArray(getArray(json))
  const jsonlFilename = jsonFilename.replace(/.json/g, '.jsonl')
  const writeStream = fs.createWriteStream(jsonlFilename)
  arr.map(x => writeStream.write(`${JSON.stringify(x)}\n`))
  writeStream.end()
  return arr.length
}

module.exports = writeJSONLines
