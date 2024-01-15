function CardShown({ word, onWordClick }) {

  return (
    <>
      <div className={`card card-${word.color}`}>
        <h2 className="word">{word.word}</h2>
      </div>
    </>
  );
}

export default CardShown;
