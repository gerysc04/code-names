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

socketIO.on('connection', (socket) => {
  socket.onAny((eventName, ...args) => {
    console.log(eventName)
  });
  socket.on('create-lobby', async ({ id, username }) => {
    const words = await fetchWords()
    const newLobby = { lobbyId: id, users: [], gameStarted: false, words, spymasterWords: [], scores: [{ team: 1, score: 0 }, { team: 2, score: 0 }], winner: 0, turn: 1, wordSubmited:false }
    lobby.methods.addLobby(newLobby)
    socket.emit('lobby-created', {lobby: newLobby, username})
    console.log('fired')
  })
  socket.on('join-lobby', async ({ user, lobbyId }) => {
    const lobbyFetched = await lobby.methods.findLobby(lobbyId)
    if (!lobbyFetched) return
    if (lobbyFetched.users.some(oldUser => oldUser.name === user.name)) {
      return
    }
    lobbyFetched.users.push(user)
    lobby.methods.updateLobby(lobbyFetched)
    socket.join(lobbyId)
    socketIO.to(lobbyId).emit('user-connected', { user, lobbyId })
    socketIO.to(socket.id).emit('new-user-connected', { user, lobbyId })
  });

  socket.on('get-lobby', async lobbyId => {
    socket.join(lobbyId)
    const lobbyFetched = await lobby.methods.findLobby(lobbyId)
    socketIO.to(socket.id).emit('return-lobby', lobbyFetched)
  })

  socket.on('game-started', async lobbyId => {
    const lobbyFetched = await lobby.methods.findLobby(lobbyId)
    if (!lobbyFetched) return
    lobbyFetched.gameStarted = true
    lobby.methods.updateLobby(lobbyFetched)
    socketIO.to(lobbyId).emit('update-lobby', lobbyFetched)
    socketIO.to(socket.id).emit('update-lobby', lobbyFetched)
  })

  socket.on('get-user', async ({ username, lobbyId }) => {
    const lobbyFetched = await lobby.methods.findLobby(lobbyId)
    if (!lobbyFetched) return
    const user = lobbyFetched.users.find(oldUser => oldUser.name === username)
    socketIO.to(socket.id).emit('return-user', user)
  })
  socket.on('update-user', async ({ user, lobbyId }) => {
    const lobbyFetched = await lobby.methods.findLobby(lobbyId)
    if (!lobbyFetched) return
    lobbyFetched.users.forEach(oldUser => {
      if (oldUser.name === user.name) {
        oldUser.team = user.team
        oldUser.role = user.role
      }
    });
    lobby.methods.updateLobby(lobbyFetched)
    socketIO.to(lobbyId).emit('update-lobby', lobbyFetched)
    socketIO.to(socket.id).emit('update-lobby', lobbyFetched)
  })

  socket.on('update-words', async ({ lobbyId, id, team }) => {
    let teamChanged = false
    const lobbyFetched = await lobby.methods.findLobby(lobbyId)
    if (!lobbyFetched) return
    lobbyFetched.words.forEach(word => {
      if (word.id === id) {
        lobbyFetched.spymasterWords.forEach(word => {
          if (word.word === lobbyFetched.activeWord) word.relatedWords -= 1
        })
        if (word.color === 4) {
          if (team === 1) {

            socketIO.to(lobbyId).emit('game-won', { team: 2 })
            socketIO.to(socket.id).emit('game-won', { team: 2 })
          } else {
            socketIO.to(lobbyId).emit('game-won', { team: 1 })
            socketIO.to(socket.id).emit('game-won', { team: 1 })
          }
        } else {
          word.clicked = true
          lobbyFetched.scores.forEach(score => {
            if (score.team === word.color) {
              score.score++
            }
            if (score.score >= 10) {
              socketIO.to(lobbyId).emit('game-won', score.team)
              socketIO.to(socket.id).emit('game-won', score.team)
            }
            if( word.color !== 3 && word.color !== team && teamChanged === false) {
              if( team === 1)lobbyFetched.turn = 2
              else lobbyFetched.turn = 1
              lobbyFetched.wordSubmited = false
            }
          })
        }
      }
    })
    console.log(lobbyFetched.turn)
    lobby.methods.updateLobby(lobbyFetched)
    socketIO.to(lobbyId).emit('update-lobby', lobbyFetched)
    socketIO.to(socket.id).emit('update-lobby', lobbyFetched)
  })
  socket.on('update-user-ready', async ({ user, lobbyId }) => {
    const lobbyFetched = await lobby.methods.findLobby(lobbyId)
    if (!lobbyFetched) return
    lobbyFetched.users.forEach(oldUser => {
      if (oldUser.name === user.name) {
        oldUser.ready = user.ready
      }
    });
    lobby.methods.updateLobby(lobbyFetched)
    socketIO.to(lobbyId).emit('update-lobby', lobbyFetched)
    socketIO.to(socket.id).emit('update-lobby', lobbyFetched)
  })

  socket.on('send-spyword', async ({word, num, team, lobbyId}) => {
    const lobbyFetched = await lobby.methods.findLobby(lobbyId)
    if (!lobbyFetched) return
    const newWord = {word, team, relatedWords: num}
    lobbyFetched.spymasterWords.push(newWord)
    lobbyFetched.wordSubmited = true  
    lobbyFetched.activeWord = word
    lobby.methods.updateLobby(lobbyFetched)
    socketIO.to(lobbyId).emit('update-lobby', lobbyFetched)
    socketIO.to(socket.id).emit('update-lobby', lobbyFetched)
  })

  socket.on('end-turn', async ({lobbyId, newTeam}) => {
    const lobbyFetched = await lobby.methods.findLobby(lobbyId)
    lobbyFetched.turn = newTeam
    lobbyFetched.wordSubmited = false
    lobby.methods.updateLobby(lobbyFetched)
    socketIO.to(lobbyId).emit('update-lobby', lobbyFetched)
    socketIO.to(socket.id).emit('update-lobby', lobbyFetched)
  })

  socket.on('update-selected-word', async ({word, lobbyId}) => {
    console.log('testa')
    const lobbyFetched = await lobby.methods.findLobby(lobbyId)
    lobbyFetched.activeWord = word
    socketIO.to(lobbyId).emit('update-lobby', lobbyFetched)
    socketIO.to(socket.id).emit('update-lobby', lobbyFetched)
  })
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});