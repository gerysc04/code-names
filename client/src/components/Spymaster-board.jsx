import { useEffect, useState } from "react";
import Card from "./Card";
import CardShown from "./Card-shown";
function SpymasterBoard({ words, onWordClick }) {
console.log(words)
return (
    <>
      {words && words.map(word => {
        return <CardShown word={word} onWordClick={onWordClick} />
      })}      
    </>
  );
}

export default SpymasterBoard;
