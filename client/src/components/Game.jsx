import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function Game({ socket }) {
  const {lobbyId} = useParams()
  const [lobby, setLobby] = useState({users: []})
  const [user, setUser] = useState({name: '', team: 0, role: 0, ready: false})
  const username = localStorage.getItem('username')
  socket.on('return-lobby', newLobby => {
    setLobby(newLobby)
    console.log(lobby)
    socket.emit('game-started', lobbyId)
  })
  
  socket.on('update-lobby',lobby => {
    console.log(lobby)
    setLobby(lobby)
  })

  socket.on('return-user', data => {
   setUser(data)
})
  
  useEffect(() => {
    socket.emit('get-lobby', lobbyId)  
    socket.emit('get-user', {username, lobbyId})
    
}, [])

return (
    <>
      <h1>{lobbyId}</h1>
    </>
  );
}

export default Game;
