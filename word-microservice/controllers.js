const word = require("./models/word");

async function getWords (req, res) {
  const arr = []
  const colors = [10, 10, 4, 1]
  for (let i = 0; i < 25; i++) {
    const id = Math.floor(Math.random() * 400) 
    let wordFromDb = await word.methods.getWord(id)
    let changed = true
    while (changed) {
      const color = Math.floor(Math.random() * 4)
      if(colors[color] !== 0){
      changed = false
    colors[color]-=1
    wordFromDb.color = color + 1
    }
    }
    arr.push(wordFromDb)    
  }
  res.write(JSON.stringify(arr))
  res.end()
}


module.exports = {getWords};
