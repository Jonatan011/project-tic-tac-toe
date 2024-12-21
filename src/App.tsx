import { useState } from "react";
import "./App.css";
import GameBoard from "./Components/GameBoard/GameBoard";
import Player from "./Components/Player/Player";
import "./Components/Player/Player.css";
import LogsTurns from "./Components/LogsTurns/LogsTurns";

export interface GameTurn {
  square: { rowIndex: number; colIndex: number };
  symbol: string;
}

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState<GameTurn[]>([]);
  const [playerNames, setPlayerNames] = useState({name1: "Jugador 1", name2: "Jugador 2"});

  function handleChangeName(
    event: React.ChangeEvent<HTMLInputElement>,
    nameKey: string,
  ) {
    setPlayerNames((prevPlayerNames) => {
      return {
        ...prevPlayerNames, 
        [nameKey]: event.target.value, 
      };
    });
  }

  function handleSelectedSquare(rowIndex: number, colIndex: number) {
    setActivePlayer((lastActivePlayer) =>
      lastActivePlayer == "X" ? "O" : "X"
    );

    setGameTurns((prevGameTurn) => {
      let actualSymbol = "X";
      if (gameTurns.length > 0 && gameTurns[0].symbol == "X") {
        actualSymbol = "O";
      }
      const actualGameTurn = [
        {
          square: { rowIndex: rowIndex, colIndex: colIndex },
          symbol: actualSymbol,
        },
        ...prevGameTurn,
      ];
      return actualGameTurn;
    });
  }
  debugger
  return (
    <>
      <main>
        <div id="game-container">
          <ol id="playersContainer" className="highlight-player">
            <Player
              namePlayer={playerNames.name1}
              onChangeName={handleChangeName}
              keyName=  "name1"
              playerSymbol="X"
              isActive={activePlayer === "X"}
            ></Player>
            <Player
              namePlayer={playerNames.name2}
              onChangeName={handleChangeName}
              keyName=  "name2"
              playerSymbol="O"
              isActive={activePlayer === "O"}
            ></Player>
          </ol>
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
