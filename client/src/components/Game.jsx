import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Board from "./Board";
import WordPannel from "./Word-pannel";
import SpymasterBoard from "./Spymaster-board";



function Game({ socket }) {
  const navigate = useNavigate()
  const { lobbyId } = useParams()
  const [lobby, setLobby] = useState({ users: [] })
  const [user, setUser] = useState({ name: '', team: 0, role: 0, ready: false })
  const username = sessionStorage.getItem('username')
  socket.on('return-lobby', newLobby => {
    setLobby(newLobby)
    socket.emit('game-started', lobbyId)
  })

  socket.on('update-lobby', lobby => {
    setLobby(lobby)
  })

  socket.on('return-user', data => {
    setUser(data)
  })
  socket.on('game-won', ({team}) => {
    navigate('/end-game/'+ team)
  })
  const onWordClick = (id) => {
    console.log(id)
    socket.emit('update-words', {lobbyId, id, team: user.team})
  }
  useEffect(() => {
    socket.emit('get-lobby', lobbyId)
    socket.emit('get-user', { username, lobbyId })
  }, [])

  return (
    <>
      <div className="container">
        <div className="upper-content">
          <WordPannel words={lobby.spymasterWords} team={1} scores={lobby.scores} />
          {user.role === 1 ? <SpymasterBoard words={lobby.words} /> : <Board words={lobby.words} onWordClick={onWordClick} />}
          <WordPannel words={lobby.spymasterWords} team={2} scores={lobby.scores} />
        </div>

      </div>
    </>
  );
}

export default Game;
