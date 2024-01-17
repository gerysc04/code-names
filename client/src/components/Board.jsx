import Card from "./Card";
import CardShown from "./Card-shown";
function Board({ words, onWordClick, turn, userTeam, endTurn }) {

return (
    <>
      <div className="container">
      <div className="top-bar">
      <h2>You are on {userTeam === 1 ? 'blue' : 'red'} team</h2>
      <h2>Its your {turn !== userTeam? "opponent's " : ''}turn</h2>
      {userTeam === turn && <button className="button" onClick={endTurn}>End turn</button>}
      </div>

      <div className="board-contaier">
      {words && words.map(word => {
        if (word.clicked) return <CardShown word={word}/>
        return <Card word={word} onWordClick={onWordClick} />
      })}      
      </div>
      </div>
    </>
  );
}

export default Board;
