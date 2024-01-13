const word = require("../word-microservice/models/word");

async function fetchWords() {
  try {
    const response = await fetch(`http://localhost:4001/words`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    data.forEach(word => {
      delete word.id
      delete word._id
      
    });
    return data
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {fetchWords}