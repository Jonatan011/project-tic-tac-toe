import { GameTurn } from "../../App";
import './LogsTurns.css';

export interface GameTurnsparams {
  gameTurns: GameTurn[];
  playerNames: {
    name1: string;
    name2: string;
  };
}

function LogsTurns({ gameTurns, playerNames }: GameTurnsparams) {
  return (
    <>
      <ol id="logTurns">
        {gameTurns.map((turn, index) => (
          <li key={index}>
            <p>Turno: {gameTurns.length - index}</p>
            <p>
              {turn.symbol === 'X' ? playerNames.name1 : playerNames.name2} ha
              colocado el símbolo '{turn.symbol}' en las coordenadas [
              {turn.square.rowIndex}][{turn.square.colIndex}]
            </p>
          </li>
        ))}
      </ol>
    </>
  );
}

export default LogsTurns;
