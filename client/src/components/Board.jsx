import { useEffect, useState } from "react";
import Card from "./Card";
import CardShown from "./Card-shown";
function Board({ words, onWordClick }) {
console.log(words)
return (
    <>
      <div className="container">

      <div className="board-contaier">
      {words && words.map(word => {
        return <Card word={word} onWordClick={onWordClick} />
      })}      
      </div>
      </div>
    </>
  );
}

export default Board;
