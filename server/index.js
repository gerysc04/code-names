const app = require('./router')
const http = require('http').Server(app);
const PORT = 4000
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});
const lobby = require('./models/lobby');
const { fetchWords } = require('./helper');

socketIO.on('connection',  (socket) => {
  socket.on('create-lobby', async({id, username}) => {
    const words = await fetchWords()
    const newLobby = {lobbyId: id, users: [], gameStarted: false, words, spymasterWords: [{word: 'test', team: '1', relatedWords: 0}]}
    lobby.methods.addLobby(newLobby)
    socket.emit('lobby-created', {lobby: newLobby, username})
  })
  socket.on('join-lobby', async ({user, lobbyId}) => {
    const lobbyFetched = await lobby.methods.findLobby(lobbyId)
    if (!lobbyFetched) return
    if (lobbyFetched.users.some(oldUser => oldUser.name === user.name )) return
    lobbyFetched.users.push(user)
    lobby.methods.updateLobby(lobbyFetched)
    socket.join(lobbyId)
    socketIO.to(lobbyId).emit('user-connected', {user, lobbyId})
    socketIO.to(socket.id).emit('new-user-connected', {user, lobbyId})
  });

  socket.on('get-lobby',async lobbyId => {
    socket.join(lobbyId)
    const lobbyFetched = await lobby.methods.findLobby(lobbyId)
    socketIO.to(socket.id).emit('return-lobby', lobbyFetched)
  })
  
  socket.on('game-started', async lobbyId => {
    const lobbyFetched = await lobby.methods.findLobby(lobbyId)
    if (!lobbyFetched) return
    lobbyFetched.gameStarted = true
    lobby.methods.updateLobby(lobbyFetched)
    console.log(lobbyId)
    socketIO.to(lobbyId).emit('update-lobby', lobbyFetched)
    socketIO.to(socket.id).emit('update-lobby', lobbyFetched)
  })

  socket.on('get-user', async ({username, lobbyId}) => {
    const lobbyFetched = await lobby.methods.findLobby(lobbyId)
    if (!lobbyFetched) return
    const user = lobbyFetched.users.find(oldUser => oldUser.name === username)
    socketIO.to(socket.id).emit('return-user', user)
  })
  socket.on('update-user', async ({user, lobbyId}) => {
    const lobbyFetched = await lobby.methods.findLobby(lobbyId)
    if (!lobbyFetched) return
    lobbyFetched.users.forEach(oldUser => {
      if (oldUser.name === user.name){
        oldUser.team = user.team
        oldUser.role = user.role
      }
    });
   lobby.methods.updateLobby(lobbyFetched)
   console.log(lobbyId)
    socketIO.to(lobbyId).emit('update-lobby', lobbyFetched)
    socketIO.to(socket.id).emit('update-lobby', lobbyFetched)
  })

  socket.on('update-user-ready', async ({user, lobbyId}) => {
    const lobbyFetched = await lobby.methods.findLobby(lobbyId)
    if (!lobbyFetched) return
    lobbyFetched.users.forEach(oldUser => {
      if (oldUser.name === user.name){
        oldUser.ready = user.ready
      }
    });
   lobby.methods.updateLobby(lobbyFetched)
    socketIO.to(lobbyId).emit('update-lobby', lobbyFetched)
    socketIO.to(socket.id).emit('update-lobby', lobbyFetched)
  })
});
   
http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});