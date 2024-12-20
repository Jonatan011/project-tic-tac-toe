import { GameTurn } from "../../App";
import "./GameBoard.css";

interface GameBoardProps {
  onSelectedSquare: (rowIndex: number, colIndex: number) => void;
  gameTurns: GameTurn[];
}

const initialGameBoard: (string | null)[][] = [];

for (let index = 0; index <= 2; index++)
  initialGameBoard.push(Array(3).fill(null));

function GameBoard({ onSelectedSquare, gameTurns }: GameBoardProps) {
  
  const gameBoard = initialGameBoard;
  for (const turn of gameTurns) {
    const { square, symbol } = turn;
    const { rowIndex, colIndex } = square;
    gameBoard[rowIndex][colIndex] = symbol;
  }
  return (
    <>
      <ol id="gameBoard">
        {gameBoard.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((column, colIndex) => (
                <li key={colIndex}>
                  <button
                    onClick={() => {
                      if (gameBoard[rowIndex][colIndex] === null)
                        onSelectedSquare(rowIndex, colIndex);
                    }}
                  >
                    {column}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
}

export default GameBoard;
