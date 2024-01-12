const word = require("./models/word");

async function getWords (req, res) {
  const arr = []
  for (let i = 0; i < 25; i++) {
    const id = Math.floor(Math.random() * 400)
    console.log(id)
    let wordFromDb = await word.methods.getWord(id)
    arr.push(wordFromDb)    
  }
  res.write(JSON.stringify(arr))
  res.end()
}


module.exports = {getWords};
