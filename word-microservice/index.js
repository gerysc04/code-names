const { populateDb } = require('./helper');
const app = require('./router')
const http = require('http').Server(app);
const PORT = 4001


app.on('listening', function() {
})
http.listen(PORT, () => {
  populateDb()
  console.log(`Server listening on ${PORT}`);
});