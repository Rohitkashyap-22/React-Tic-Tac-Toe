import { useState } from "react"
const combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const TicTacToe = () => {
  const arr = Array(9).fill(null);
  const [board, setBoard] = useState(arr)
  const [turnX, setTurn] = useState(true)
  const [winner, setWinner] = useState(null)

  function renderSquare(i){
    return <button className="square" onClick={()=>handleClick(i)}>{board[i]}</button>
  }

  function handleClick(i){
    if (board[i] != null || winner != null) {
      return;
    }
    const newBoard = [...board];
    newBoard[i] = turnX ? "X" : "O";
    setBoard(newBoard);
    setTurn(!turnX);
    const answer = checkWinner(newBoard);
    if (answer) {
      setWinner(newBoard[answer[0]]);
    } else if (newBoard.every((cell) => cell !== null)) {
      setWinner("draw");
    } else {
      setTurn(!turnX);
    }
  }

  function checkWinner(board) {
    for(let i=0; i<8; i++){
        const [a,b,c] = combinations[i]
        if(board[a] && board[a]==board[b] && board[b]==board[c]){
            return [a,b,c]
        }
    }
    return null 
  }

  function handleReset(){
    setBoard(arr)
    setTurn(true)
    setWinner(null)
  }

  return (
    <>
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      {winner && winner!=='draw' && <h2 className="winner">{winner} is the Winner !</h2> }
      {winner=='draw' && <h2 className="winner">Match Draw !</h2> }
      <button className="reset" onClick={handleReset}>Reset</button>
    </>
  );
}

export default TicTacToe