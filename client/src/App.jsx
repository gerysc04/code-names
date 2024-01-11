import './App.css';
import socketIO from "socket.io-client"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Rules from './components/Rules'

const socket = socketIO.connect("http://localhost:4000")

function App() {

  return (
   <>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/rules" element={<Rules />} />

      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
