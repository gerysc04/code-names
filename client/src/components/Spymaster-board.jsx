import { useState } from "react";
import CardShown from "./Card-shown";
function SpymasterBoard({ words, onPostWord, turn, userTeam }) {
  const [chatWord, setChatword] = useState('')
  const [num, setnum] = useState(1)

  const handleChatWord = (e) => {
    setChatword(e.target.value)
  }
  const handleSelector = (e) => {
    setnum(e.target.value)
  }

  return (
    <>
      <div className="container">
        <h2>spymaster</h2>
        <h2>Its your {turn !== userTeam? "opponent's" : ''}turn</h2>
        <div className="board-contaier">
          {words && words.map(word => {
            return <CardShown word={word} color={word.color} />
          })}
        </div>
        <div className="chat">
          <form className="form word-form" onSubmit={(e) => onPostWord(e,chatWord, num)}>
            <input type="text" name='word' placeholder='Insert a word' value={chatWord} onChange={handleChatWord} className="input"></input>
            <select className="dropdown" onChange={handleSelector}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button className="button custom-button" type="submit">Post a word</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SpymasterBoard;
