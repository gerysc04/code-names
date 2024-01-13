import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Board from "./Board";
import WordPannel from "./Word-pannel";
import SpymasterBoard from "./Spymaster-board";
function Game({ socket }) {
  const {lobbyId} = useParams()
  const [lobby, setLobby] = useState({users: []})
  const [user, setUser] = useState({name: '', team: 0, role: 0, ready: false})
  const username = localStorage.getItem('username')
  socket.on('return-lobby', newLobby => {
    setLobby(newLobby)
    socket.emit('game-started', lobbyId)
    console.log(lobby.spymasterWords);
  })
  
  socket.on('update-lobby',lobby => {
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
    <div className="container">
      <div className="upper-content">
      <WordPannel words={lobby.spymasterWords} team={1}  />
      {user.role === 1 ? <SpymasterBoard words={lobby.words} />  : <Board words={lobby.words} /    >}
      <WordPannel words={lobby.spymasterWords} team={2}  />
      </div>

    </div>
    </>
  );
}

export default Game;
