async function fetchLobby(id) {
  try {
    const response = await fetch(`http://localhost:4000/lobby/${id}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = {fetchLobby}