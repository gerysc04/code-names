import CardShown from "./Card-shown";
function SpymasterBoard({ words, onWordClick }) {
return (
    <>
      <div className="container">
        <h1>spymaster</h1>
      <div className="board-contaier">
      {words && words.map(word => {
        return <CardShown word={word} color={word.color} />
      })}      
      </div>
      </div>
    </>
  );
}

export default SpymasterBoard;
