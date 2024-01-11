import logo from './logo.svg';
import './App.css';
import socketIO from "socket.io-client"

const socket = socketIO.connect("http://localhost:4000")
function App() {
  socket.emit("create-lobby", 1234)
  socket.on('user-connected', data => {
    console.log(data)
  })
  const handleClick = () => {
    socket.emit("clicked", 'ad')
  }
  socket.on('recieve-message', data => {
    console.log(data)
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={handleClick}>test</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
