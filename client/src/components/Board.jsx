import Card from "./Card";
import CardShown from "./Card-shown";
function Board({ words, onWordClick }) {

return (
    <>
      <div className="container">

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
