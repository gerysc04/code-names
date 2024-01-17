function Rules() {

  return (
    <>
      <div className="container rule-container">
        <h1>Rules</h1>
        <p className="rule-text">Codenames is a game played by 4 players in which players are split into two teams, red and blue, and guess words based on clues from their teammates. One player from each team becomes the spymaster, while the other play as field operative. The end goal is to place all of the team’s agent tiles.</p>
        <p className="rule-text">When the turn starts the spymaster from the team who's turn is will post a word in chat with a number representing the number of words on the table that can this word represents. The operative from that team then have to guess the words (he can also guess words from previous turns) if a card from the other team is clicked the turn will change automatically, if the assasin card is clicked the game will end and the team who clicked it will lose. The operative can end his team's turn whenever he wants.</p>
        <p className="rule-text"></p>
        <a href="/"><button className="button">Back home</button></a>
      </div>

    </>
  );
}

export default Rules;
