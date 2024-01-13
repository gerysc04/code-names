function Card({ word, onWordClick }) {

return (
    <>
    <div className={`card card-${word.color}`}>
      <h2 className="word">{word.word}</h2>  
      <h2>{word.color}</h2>  
    </div>
    </>
  );
}

export default Card;




