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
    if (lobby.turn === user.team) {
      if(lobby.spymasterWords.length === 0) return alert("The selected word don't have any other related words wait for the spymaster to post a word or finish your turn if needed")
      lobby.spymasterWords.forEach(word => {
        if (lobby.activeWord !== '' && word.word === lobby.activeWord ) {
          
          if( word.relatedWords < 0) {
            return alert("The selected word don't have any other related words wait for the spymaster to post a word or finish your turn if needed")}
          else socket.emit('update-words', {lobbyId, id, team: user.team})
        }
      })
    } else return alert ('wait for your turn')
  }

  const onPostWord = (e, word, num) => {
    e.preventDefault()
    if(word === '' ) return alert('please dont leave the word field empty')
    else if (word.length > 10 ) return alert('Word must be less than 10 characters long')
    if (lobby.turn === user.team && lobby.wordSubmited === false) {
      socket.emit('send-spyword', {word, num, team: user.team, lobbyId})
    } else return alert('wait for your turn to post a word')
  }

  const endTurn = () => {
    let newTeam = 0
    if (user.team === 1) newTeam = 2
    else newTeam = 1
    socket.emit('end-turn', {lobbyId, newTeam})
  }

  const onPannelClick = (e, word) => {
    console.log(word)
    socket.emit('update-selected-word', {word, lobbyId})
    console.log('test')
  }

  useEffect(() => {
    socket.emit('get-lobby', lobbyId)
    socket.emit('get-user', { username, lobbyId })
  }, [])

  return (
    <>
      <div className="container">
        <div className="upper-content">
          <WordPannel words={lobby.spymasterWords} team={1} scores={lobby.scores} activeWord={lobby.activeWord} onPannelClick={onPannelClick} />
          {user.role === 1 ? <SpymasterBoard words={lobby.words} onPostWord={onPostWord} turn={lobby.turn} userTeam={user.team}  /> : <Board words={lobby.words} onWordClick={onWordClick} turn={lobby.turn} userTeam={user.team} endTurn={endTurn} />}
          <WordPannel words={lobby.spymasterWords} team={2} scores={lobby.scores} activeWord={lobby.activeWord} onPannelClick={onPannelClick}/>
        </div>

      </div>
    </>
  );
}

export default Game;
