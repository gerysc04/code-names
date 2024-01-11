const express = require("express")
const app = express()
const cors = require("cors")
const http = require('http').Server(app);
const PORT = 4000
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});
const lobbies = []
app.use(cors())
let users = []
app.get("/", (req, res) => {
  console.log('user connected')
  res.json({message: "Hello"})
});

socketIO.on('connection', (socket) => {
  socket.on('create-lobby',({id, username}) => {
    console.log(id)
    const newLobby = {lobbyId: id, users: [], gameStarted: false, words: ['hello','hello','hello','hello','hello','hello','hello','hello','hello','hello','hello','hello','hello','hello','hello','hello','hello','hello','hello','hello','hello','hello','hello','hello','hello']}
    lobbies.push(newLobby)
    socket.emit('lobby-created', {lobbies, lobbyId: newLobby.lobbyId, username})
  })
  socket.on('join-lobby', ({user, lobbyId}) => {
    socket.join('fired')
    const lobby = lobbies.find(lobby => lobby.lobbyId === lobbyId)
    lobby.users.push(user)
    console.log(lobbies)
    socketIO.to(lobbyId).emit('user-connected', {message: 'test'})
  });
});
   
http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});