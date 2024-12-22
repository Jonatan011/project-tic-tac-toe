import { GameTurn } from "../../App";
import "./LogsTurns.css";

export interface GameTurnsparams {
  gameTurns: GameTurn[];
  playerNames: {
    name1: string;
    name2: string;
  };
}

function LogsTurns({ gameTurns, playerNames }: GameTurnsparams) {
  let winnerText = function winnerMessage(
    turn: GameTurn,
    playerNames: {
      name1: string;
      name2: string;
    }
  ) {
    return (
      <span>
        👑 👑 --El Jugador '
        {turn.symbol == "X" ? playerNames.name1 : playerNames.name2}' es el
        ganador-- 👑 👑
      </span>
    );
  };
  let draftText = <span>Nadie ha ganado, la partida a terminado empate</span>;

  return (
    <>
      <ol id="logTurns">
        {gameTurns.map((turn, index) => {
          const isWinner = turn.hasWinner.isWinner;
          return (
            <li key={index}>
              <p>Turno: {gameTurns.length - index}</p>
              <p>{isWinner && winnerText(turn, playerNames)}</p>
              <p>
                {gameTurns.length > 8 &&
                !turn.hasWinner.isWinner &&
                gameTurns.length - index == 9
                  ? draftText
                  : null}
              </p>
              <p>
                {turn.symbol === "X" ? playerNames.name1 : playerNames.name2} ha
                colocado el símbolo '{turn.symbol}' en las coordenadas [
                {turn.square.rowIndex}][{turn.square.colIndex}]
              </p>
            </li>
          );
        })}
      </ol>
    </>
  );
}

export default LogsTurns;
