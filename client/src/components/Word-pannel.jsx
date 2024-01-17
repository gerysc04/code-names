import { useState } from "react"

function WordPannel({ words, team, onPannelClick, scores, activeWord }) {
  const [score, setScore] = useState(0)
  if (scores) {
    scores.forEach(test => {
      if (test.team === team) {
        if (score !== test.score) setScore(test.score)
      }
    })
  }
  return (
    <>
      <div className="word-pannel">

        <h2>{team === 1? 'Blue' : 'Red'} team score is: {score}</h2>
        <div className="words"> 
          {words && words.map(word => {
            if(word.relatedWords > 0 ) {

              if (word.team === team) {
                if ( word.word === activeWord) {
                  return <div className="spyword active" >
                <h3 className="word-word">{word.word}</h3>
                <h3>{word.relatedWords}</h3>
              </div>
              }
              return <div className="spyword" onClick={(e) => onPannelClick(e, word.word)}>
                <h3 className="word-word">{word.word}</h3>
                <h3>{word.relatedWords}</h3>
              </div>
              } 
            }
            return <></>
          })}
        </div>
      </div>
    </>
  );
}

export default WordPannel;
