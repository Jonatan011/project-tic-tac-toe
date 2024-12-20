import { useState } from "react";

function Player({
  initialName,
  playerSymbol,
  isActive,
}: {
  initialName: string;
  playerSymbol: string;
  isActive: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleClickButton() {
    setIsEditing((isEditing) => !isEditing);
  }

  function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    setPlayerName(event.target.value);
  }

  const playerNameField = isEditing ? (
    <input
      type="text"
      name=""
      id=""
      required
      value={playerName}
      onChange={(event) => handleChangeName(event)}
    />
  ) : (
    <span className="player-name">{playerName}</span>
  );

  const buttonChangeValue = isEditing ? "Guardar" : "Cambiar";
  return (
    <>
      <li className={isActive ? "active" : undefined}>
        <span className="player">
          {playerNameField}
          <span className="player-symbol">{playerSymbol}</span>
        </span>
        <button onClick={() => handleClickButton()}>{buttonChangeValue}</button>
      </li>
    </>
  );
}

export default Player;
