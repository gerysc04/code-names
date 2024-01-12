const fs = require('fs')
const word = require('./models/word')

async function populateDb () {

  fs.readFile('words.txt', (err, data) => {
    word.methods.deleteDb()
    if (err) return console.log(err)
    const string = data.toString()
    const arr = string.split('\n')
    arr.forEach(wordfromArr => {
      word.methods.addWord(wordfromArr)
    })
  })
}


module.exports = {populateDb};
