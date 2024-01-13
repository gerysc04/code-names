const mongoose = require('./index')
let id = 0
const word = new mongoose.Schema({
  word: String,
  color: Number,
  id: Number
})

word.methods.addWord = async function addWord (word) {
  
  const wordObject = {word, id, color: 0, clicked: false}
  id++
  return await Word.create(wordObject)
}

word.methods.deleteDb = async function deleteDb () {
  return await Word.collection.drop()
}

word.methods.getWord = async function getWord (id) {
  return await Word.findOne({id})
}



const Word = mongoose.model('Word', word);

module.exports = word;