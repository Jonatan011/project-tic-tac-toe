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
  return (
    <>
      <main>
        <div id="game-container">
          <ol id="playersContainer" className="highlight-player">
            <Player
              initialName="Jugador 1"
              playerSymbol="X"
              isActive={activePlayer === "X"}
            ></Player>
            <Player
              initialName="Jugador 2"
              playerSymbol="O"
              isActive={activePlayer === "O"}
            ></Player>
          </ol>
          <GameBoard
            gameTurns={gameTurns}
            onSelectedSquare={handleSelectedSquare}
          ></GameBoard>
          <LogsTurns gameTurns={gameTurns} />
        </div>
      </main>
    </>
  );
}

export default App;
