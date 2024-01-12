import { useEffect, useState } from "react"
import { useParams } from 'react-router';
import UserCard from "./User-card";
import { fetchLobby } from "../fetch";
import { useNavigate } from "react-router-dom"


function Lobby({ socket }) {
  const {lobbyId} = useParams()
  const navigate = useNavigate()
  const [lobby, setLobby] = useState({users: []})
  const [user, setUser] = useState({name: '', team: 0, role: 0, ready: false})
  const username = localStorage.getItem('username')
  
  
  socket.on('return-lobby', newLobby => {
    setLobby(newLobby)
  })
  
  socket.on('return-user', data => {
   setUser(data)
})

socket.on('user-connected', data => {
  socket.emit('get-lobby', lobbyId)  
})
socket.on('update-lobby',lobby => {
  console.log(lobby)
  setLobby(lobby)
})
const handleClick = (e) => {
  e.preventDefault()
  const buttonId = e.target.id
  if (buttonId === '0') {
    user.team = 1 
    user.role = 1
  } else if (buttonId === '1') {
    user.team = 1 
    user.role = 2
  } else if ( buttonId === '2') {
    user.team = 2
    user.role = 1
  }
  else if ( buttonId === '3') {
    user.team = 2
    user.role = 2
  }
  socket.emit('update-user', {user, lobbyId})
}

const handleReadyClick = () => {

  console.log(user)
  if (user.ready === false) user.ready = true
  else user.ready = false
  socket.emit('update-user-ready', {user, lobbyId})
}
socket.onAny((event, ...args) => {
  console.log(`Received event: ${event}`);
});
useEffect(() => {
    socket.emit('get-lobby', lobbyId)  
    socket.emit('get-user', {username, lobbyId})
  
}, [])

useEffect(() => {
  const users = lobby.users
    console.log(users.length)
    if(users !== undefined) {

      if (users.length === 4) {
        if (users.every(user => user.ready === true)){
          navigate('/g/'+ lobbyId)
        }
      }
    }
}, [lobby])

return (
    <>
    <div className="container">
        <h2>{lobbyId}</h2>
      <div className="teams">

        {/* Blue team  */}
        <div className="team blue-team">
          <h1>Blue team</h1>
          <h3>Spymaster</h3>
          {lobby && lobby.users && lobby.users.map(user => {
            if (user.team === 1 && user.role === 1) return <UserCard user={user} />
            return <></>
          })}
          <button id="0" onClick={e => handleClick(e)} className="button">Join</button>
          <h3>Operatives</h3>
          {lobby.users && lobby.users.map(user => {
            if (user.team === 1 && user.role === 2) return <UserCard user={user} />
            return <></>
          })}
          <button id="1" onClick={e => handleClick(e)} className="button">Join</button>
        </div>

        {/* Red team */}
        <div className="team red-team">
          <h1>Red team</h1>
          <h3>Spymaster</h3>
          {lobby && lobby.users && lobby.users.map(user => {
            if (user.team === 2 && user.role === 1) return <UserCard user={user} />
            return <></>
          })}
          <button id="2" onClick={e => handleClick(e)} className="button">Join</button>
          <h3>Operatives</h3>
          {lobby.users && lobby.users.map(user => {
            if (user.team === 2 && user.role === 2) return <UserCard user={user} />
            return <></>
          })}
          <button id="3" onClick={e => handleClick(e)} className="button">Join</button>
        </div>
      </div>
      <div className="waiting-room">
        {lobby.users && lobby.users.map(user => {
          if (user.team === 0){
            return <UserCard user={user} />
          }
          return <></>
        })}
        <button className="button" onClick={handleReadyClick}>{user.ready ? 'Not ready' : 'Ready'}</button>
      </div>
      </div>
    </>
  );
}

export default Lobby;
