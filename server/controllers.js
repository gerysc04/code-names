const lobby = require('./models/lobby');

async function getLobby (req, res) {
  const id = req.params.id
  const newlobby = await lobby.methods.findLobby(id);
  res.statusCode = 201;
  res.write(JSON.stringify(newlobby));
  res.end();
}

module.exports = {getLobby};
