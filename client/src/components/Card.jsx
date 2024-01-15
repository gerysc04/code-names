function Card({ word, onWordClick }) {
return (
    <>
    <div className='card' onClick={() => onWordClick(word.id)}>
      <h2 className="word">{word.word}</h2>  
    </div>
    </>
  );
}

export default Card;




