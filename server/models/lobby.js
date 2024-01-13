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
    clicked: Boolean
  }],

  spymasterWords:[{
    word: String,
    team: Number,
    relatedWords: Number
  }],
  gameStarted: Boolean
})

lobby.methods.findLobby = async function findLobby (id) {
  const lobby = await Lobby.findOne({lobbyId: id})
  return lobby
}
lobby.methods.addLobby = async function addLobby (lobby) {
 try {
  if (lobby === null) return
  const lobbyWithId = await Lobby.findOne({lobbyId: lobby.lobbyId})
  if(!lobbyWithId)return await Lobby.create({lobbyId: lobby.lobbyId, users: lobby.users, words: lobby.words, gameStarted: lobby.gameStarted, spymasterWords: lobby.spymasterWords})
 } catch (error) {
  console.log(error)
 }
 
}
lobby.methods.updateLobby = async function updateLobby (lobby) {
  const {lobbyId, users, words, gameStarted} = lobby
  await Lobby.findOneAndReplace({lobbyId}, {lobbyId, users, words, gameStarted})
}

lobby.methods.getLobbys = async function getLobbys () {
  return await Lobby.find({})
}

const Lobby = mongoose.model('Lobby', lobby);

module.exports = lobby;