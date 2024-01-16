const mongoose = require('./index')

const lobby = new mongoose.Schema({
  lobbyId:{
    type: String,
    required: true
  },
  users: [{
    name: String,
    team: Number,
    role: Number,
    ready: Boolean
  }],
  words: [{
    word: String,
    color: Number,
    clicked: Boolean,
    id: Number
  }],

  spymasterWords:[{
    word: String,
    team: Number,
    relatedWords: Number,
  }],
  scores: [
   {
    team: Number,
    score: Number
   }
  ],
  winner: Number,
  turn: Number,
  gameStarted: Boolean,
  wordSubmited: Boolean,
  activeWord: String
})

lobby.methods.findLobby = async function findLobby (id) {
  const lobby = await Lobby.findOne({lobbyId: id})
  return lobby
}
lobby.methods.addLobby = async function addLobby (lobby) {
 try {
  if (lobby === null) return
  const lobbyWithId = await Lobby.findOne({lobbyId: lobby.lobbyId})
  if(!lobbyWithId)return await Lobby.create({lobbyId: lobby.lobbyId, users: lobby.users, words: lobby.words, gameStarted: lobby.gameStarted, spymasterWords: lobby.spymasterWords, scores: lobby.scores, winner: lobby.winner, turn: lobby.turn, wordSubmited: lobby.wordSubmited})
 } catch (error) {
  console.log(error)
 }
 
}
lobby.methods.updateLobby = async function updateLobby (lobby) {
  const {lobbyId, users, words, gameStarted, spymasterWords, scores, winner, turn, activeWord, wordSubmited} = lobby
  await Lobby.findOneAndReplace({lobbyId}, {lobbyId, users, words, gameStarted, spymasterWords, scores, winner, turn, activeWord, wordSubmited})
}

lobby.methods.getLobbys = async function getLobbys () {
  return await Lobby.find({})
}

const Lobby = mongoose.model('Lobby', lobby);

module.exports = lobby;