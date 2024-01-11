const express = require("express")
const app = express()
const cors = require("cors")
const http = require('http').Server(app);
const PORT = 4000
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(cors())
let users = []
app.get("/", (req, res) => {
  console.log('user connected')
  res.json({message: "Hello"})
});


   
http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});