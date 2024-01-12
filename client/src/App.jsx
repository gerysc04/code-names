import './App.css';
import socketIO from "socket.io-client"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Rules from './components/Rules'
import Lobby from './components/Lobby';
import Game from './components/Game';

const socket = socketIO.connect("http://localhost:4000")

function App() {

  return (
   <>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/lobby/:lobbyId" element={<Lobby socket={socket}/>} />
        <Route path='/game/:lobbyId' element={<Game socket={socket}/>} />
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
