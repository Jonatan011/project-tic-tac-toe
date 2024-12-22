import { GameTurn } from "../../App";
import "./GameBoard.css";

interface GameBoardProps {
  onSelectedSquare: (
    rowIndex: number,
    colIndex: number,
    gameBoard: (string | null)[][]
  ) => void;
  gameTurns: GameTurn[];
}

const initialGameBoard: (string | null)[][] = [];

for (let index = 0; index <= 2; index++)
  initialGameBoard.push(Array(3).fill(null));

function GameBoard({ onSelectedSquare, gameTurns }: GameBoardProps) {
  function isWinningSquare(rowIndex: number, colIndex: number) {
    if (
      gameTurns.length > 4 &&
      gameTurns[0].hasWinner.winningCombinations != null
    ) {
      return gameTurns[0].hasWinner.winningCombinations.some(
        (combination) =>
          combination.rowIndex === rowIndex && combination.colIndex === colIndex
      );
    }
    return false;
  }

  const gameBoard = [...initialGameBoard.map((array) => [...array])];
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
                    className={
                      isWinningSquare(rowIndex, colIndex) ? "winningSquare" : ""
                    }
                    onClick={() => {
                      if (
                        gameTurns.length > 4 &&
                        gameTurns[0].hasWinner.isWinner
                      )
                        return false;

                      if (gameBoard[rowIndex][colIndex] === null)
                        onSelectedSquare(rowIndex, colIndex, gameBoard);
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
