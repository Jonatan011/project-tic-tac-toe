import { useState } from "react";
import "./App.css";
import GameBoard from "./Components/GameBoard/GameBoard";
import Player from "./Components/Player/Player";
import "./Components/Player/Player.css";
import LogsTurns from "./Components/LogsTurns/LogsTurns";
import { WINNING_CONDITIONS } from "./data/winningCombinations";
import GameOver from "./Components/GameOver/GameOver";

export interface GameTurn {
  square: { rowIndex: number; colIndex: number };
  symbol: string;
  hasWinner:
    | {
        isWinner: boolean;
        winningCombinations?: undefined;
      }
    | {
        isWinner: boolean;
        winningCombinations: {
          rowIndex: number;
          colIndex: number;
        }[];
      };
}

function App() {
  function setActivePlayer(gameTurns: GameTurn[]) {
    let activePlayer = "X";
    activePlayer =
      gameTurns.length > 0 && gameTurns[0].symbol === "X" ? "O" : "X";
    if (gameTurns.length > 4 && gameTurns[0].hasWinner.isWinner)
      activePlayer = gameTurns[0].symbol;
    return activePlayer;
  }

  function setHasWinner(
    prevGameTurn: GameTurn[],
    newGameBoard: (string | null)[][]
  ) {
    if (prevGameTurn.length < 4) return { isWinner: false };
    if (prevGameTurn.length >= 4) {
      for (const combination of WINNING_CONDITIONS) {
        let symbolWinner = {
          firstSymbol:
            newGameBoard[combination[0].rowIndex][combination[0].colIndex],
          secondSymbol:
            newGameBoard[combination[1].rowIndex][combination[1].colIndex],
          thirdSymbol:
            newGameBoard[combination[2].rowIndex][combination[2].colIndex],
        };
        if (
          symbolWinner.firstSymbol &&
          symbolWinner.firstSymbol === symbolWinner.secondSymbol &&
          symbolWinner.secondSymbol === symbolWinner.thirdSymbol
        ) {
          return { isWinner: true, winningCombinations: combination };
        }
      }
    }
    return { isWinner: false };
  }

  const [gameTurns, setGameTurns] = useState<GameTurn[]>([]);
  const [playerNames, setPlayerNames] = useState({
    name1: "Jugador 1",
    name2: "Jugador 2",
  });
  const activePlayer = setActivePlayer(gameTurns);

  function handleChangeName(
    event: React.ChangeEvent<HTMLInputElement>,
    nameKey: string
  ) {
    setPlayerNames((prevPlayerNames) => {
      return {
        ...prevPlayerNames,
        [nameKey]: event.target.value,
      };
    });
  }

  function handleSelectedSquare(
    rowIndex: number,
    colIndex: number,
    gameBoard: (string | null)[][]
  ) {
    setGameTurns((prevGameTurn) => {
      const actualSymbol = setActivePlayer(prevGameTurn);
      const newGameBoard = [...gameBoard];
      newGameBoard[rowIndex][colIndex] = actualSymbol;
      let hasWinner = setHasWinner(prevGameTurn, newGameBoard);

      const actualGameTurn = [
        {
          square: { rowIndex: rowIndex, colIndex: colIndex },
          symbol: actualSymbol,
          hasWinner: hasWinner,
        },
        ...prevGameTurn,
      ];
      return actualGameTurn;
    });
  }
  function handleRestartGame() {
    setGameTurns([]);
  }
  return (
    <>
      <main>
        <div id="game-container">
          <ol id="playersContainer" className="highlight-player">
            <Player
              namePlayer={playerNames.name1}
              onChangeName={handleChangeName}
              keyName="name1"
              playerSymbol="X"
              isActive={activePlayer === "X"}
            ></Player>
            <Player
              namePlayer={playerNames.name2}
              onChangeName={handleChangeName}
              keyName="name2"
              playerSymbol="O"
              isActive={activePlayer === "O"}
            ></Player>
          </ol>
          {gameTurns.length > 4 && gameTurns[0].hasWinner.isWinner && (
            <GameOver
              title="Revancha"
              onChangedRestarGame={handleRestartGame}
            />
          )}
          {gameTurns.length > 8 && !gameTurns[0].hasWinner.isWinner && (
            <GameOver
              title="Nueva partida"
              onChangedRestarGame={handleRestartGame}
            />
          )}
          <GameBoard
            gameTurns={gameTurns}
            onSelectedSquare={handleSelectedSquare}
          ></GameBoard>
        </div>
        <LogsTurns playerNames={playerNames} gameTurns={gameTurns} />
      </main>
    </>
  );
}

export default App;
