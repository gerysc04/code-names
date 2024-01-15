import { useState } from "react"

function WordPannel({ words, team, onPannelClick, scores }) {
  const [score, setScore] = useState(0)
  if(scores) {
    scores.forEach(test => {
      if (test.team === team) {
        if(score !== test.score) setScore(test.score)
      }
    })
  }
  return (
      <>
        <h2>{score}</h2>    
      </>
    );
  }
  
  export default WordPannel;
  