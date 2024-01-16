import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom"

function EndGame() {
  const {team} = useParams()
  const navigate = useNavigate()
  const goHome = () => {
    navigate('/')
  }
  return (
    <>
    <div className="container">
      <h1>Team {team === 1 ? 'blue' : 'red'} won the game!</h1>
      <button className="button" onClick={goHome}>Back</button>
    </div>
    </>
  );
}

export default EndGame;
