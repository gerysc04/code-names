import { useState } from "react"
import socketIO from "socket.io-client"
import { generateId } from "../helpers"

const socket = socketIO.connect("http://localhost:4000")

socket.on('user-connected', data => {
  console.log(data);
});

function Home({ socket }) {
  const [lobbyId, setLobbyId] = useState('')
  const [username, setusername] = useState('')
  
  socket.on('lobby-created', data => {
    console.log('fired')
    const user = { name: data.username, team: 0, role: 0, ready: false }
    socket.emit('join-lobby', { user, lobbyId: data.lobbyId })
  })
  

  const handleChangeLobbyId = (e) => {
    setLobbyId(e.target.value)
    console.log(lobbyId)
  }

  const handleChangeUsername = (e) => {
    setusername(e.target.value)
    console.log(username)
  }


  const handleCreateClick = (e) => {
    e.preventDefault()
    if (username === '') return alert('please insert a username')
    const id = generateId()
    socket.emit("create-lobby", {id, username})
  }

  const handleJoinClick = (e) => {
    e.preventDefault()
    if (username === '') return alert('please insert a username')
    if (lobbyId === '') return alert('please insert a lobby id')
    const user = { name: username, team: 0, role: 0, ready: false }
    socket.emit('join-lobby', { user, lobbyId })
  }
  const handleOpenJoinModal = () => {
    const modal = document.getElementById('join-modal')
    modal.style.display = 'flex'
  }

  const handleCloseJoinModal = () => {
    const modal = document.getElementById('join-modal')
    modal.style.display = 'none'
    console.log()
  }

  const handleOpenCreateModal = () => {
    const modal = document.getElementById('create-modal')
    modal.style.display = 'flex'
  }

  const handleCloseCreateModal = () => {
    const modal = document.getElementById('create-modal')
    modal.style.display = 'none'
    console.log()
  }

  return (
    <>
      <div className="container">
        <button className="button" onClick={handleOpenCreateModal}>Create</button>
        <button className="button" onClick={handleOpenJoinModal}>Join</button>
        <a href="/rules"><button className="button">Rules</button></a>
      </div>
      <div className="modal-container join-modal " id="join-modal">
        <div className="modal">
          <div className="modal-content">
            <div className="close">
              <button className="button close-button" onClick={handleCloseJoinModal}>X</button>
            </div>
            <form className="form" onSubmit={handleJoinClick}>
              <input type="text" name='lobbyId' placeholder='Insert the lobby id' value={lobbyId} onChange={handleChangeLobbyId} className="input"></input>
              <input type="text" name='username' placeholder='Insert a username' value={username} onChange={handleChangeUsername} className="input"></input>
              <button className="button" type="submit">Join lobby</button>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-container create-modal">
      </div>

      <div className="modal-container create-modal " id="create-modal">
        <div className="modal">
          <div className="modal-content">
            <div className="close">
              <button className="button close-button" onClick={handleCloseCreateModal}>X</button>
            </div>
            <form className="form" onSubmit={handleCreateClick}>
              <input type="text" name='username' placeholder='Insert a username' value={username} onChange={handleChangeUsername} className="input"></input>
              <button className="button" type="submit">Create lobby</button>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-container create-modal">
      </div>


    </>
  );
}

export default Home;
