import { useEffect, useState } from "react"
import { useParams } from 'react-router';
import UserCard from "./User-card";
import { useNavigate } from "react-router-dom"


function Lobby({ socket }) {
  let triggered = false
  const {lobbyId} = useParams()
  const navigate = useNavigate()
  const [lobby, setLobby] = useState({users: []})
  const [user, setUser] = useState({name: '', team: 0, role: 0, ready: false})
  const username = sessionStorage.getItem('username')
  
  socket.on('return-lobby', newLobby => {
    setLobby(newLobby)
  })

  socket.on('new-user-connected', ({user, lobbyId}) => {
    triggered = false
    const usern = sessionStorage.getItem('username')
    if(!usern) sessionStorage.setItem('username', user.name)
  });
  
  socket.on('return-user', data => {
   setUser(data)
})

socket.on('user-connected', data => {
  socket.emit('get-lobby', lobbyId)  
})
socket.on('update-lobby',lobby => {
  setLobby(lobby)
})
const handleClick = (e) => {
  e.preventDefault()
  const buttonId = e.target.id
  if (buttonId === '0') {
    console.log(lobby)
    if(lobby.users.some(user => user.team === 1 && user.role === 1) ) return alert('This position its taken by another user')
    user.team = 1 
    user.role = 1
  } else if (buttonId === '1') {
    if(lobby.users.some(user => user.team === 1 && user.role === 2)) return alert('This position its taken by another user')
    user.team = 1 
    user.role = 2
  } else if ( buttonId === '2') {
    if(lobby.users.some(user => user.team === 2 && user.role === 1)) return alert('This position its taken by another user')
    user.team = 2
    user.role = 1
  }
  else if ( buttonId === '3') {
    if(lobby.users.some(user => user.team === 2 && user.role === 2)) return alert('This position its taken by another user')
    user.team = 2
    user.role = 2
  }
  socket.emit('update-user', {user, lobbyId})
}

const handleReadyClick = () => {

  if (user.ready === false) user.ready = true
  else user.ready = false
  socket.emit('update-user-ready', {user, lobbyId})
}

const coppyToClipboard = () => {
  navigator.clipboard.writeText(`http://localhost:3000/lobby/${lobbyId}`)
}

useEffect(() => {
  if (!username && triggered === false){
     let newUsername = prompt('Please insert a username: ')
     if (newUsername === '') return alert('please insert a username')
     const newUser = { name: newUsername, team: 0, role: 0, ready: false }
     socket.emit('join-lobby', { user: newUser, lobbyId })
     triggered = true
    } else if(triggered === false) {
      socket.emit('get-lobby', lobbyId)    
      socket.emit('get-user', {username, lobbyId})
    }
  
}, [username])

useEffect(() => {
  const users = lobby.users
    if(users !== undefined) {
      if (users.length === 4) {
        if (users.every(user => user.ready === true)){
          if(users.every(user => user.team !== 0) && users.every(user => user.role !== 0))
          navigate('/game/'+ lobbyId)
        }
      }
    }
}, [lobby, username])

return (
    <>
    <div className="container">
        <h2 onClick={coppyToClipboard}>{lobbyId}</h2>
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
        <button className="button" onClick={handleReadyClick}>{user.ready ? ' Not ready' : ' Ready'}</button>
      </div>
      </div>
    </>
  );
}

export default Lobby;
