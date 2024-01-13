import { useEffect, useState } from "react";
import Card from "./Card";
import CardShown from "./Card-shown";
function SpymasterBoard({ words, onWordClick }) {
return (
    <>
      <div className="container">
        <h1>spymaster</h1>
      <div className="board-contaier">
      {words && words.map(word => {
        if (word.clicked) return <CardShown word={word} color={word.color} />
        return <Card word={word} onWordClick={onWordClick} />
      })}      
      </div>
      </div>
    </>
  );
}

export default SpymasterBoard;
