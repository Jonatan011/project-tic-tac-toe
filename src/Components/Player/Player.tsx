import { useState } from "react";

function Player({
  initialName,
  playerSymbol,
}: {
  initialName: string;
  playerSymbol: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleChangeClick() {
    setIsEditing((isEditing) => !isEditing);
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPlayerName(event.target.value);
  }

  const playerNameField = isEditing ? (
    <input
      type="text"
      name=""
      id=""
      required
      value={playerName} 
      onChange={(event) => handleNameChange(event)}
    />
  ) : (
    <span className="player-name">{playerName}</span>
  );

  const buttonChangeValue = isEditing ? "Guardar" : "Cambiar";
  return (
    <>
      <li>
        <span className="player">
          {playerNameField}
          <span className="player-symbol">{playerSymbol}</span>
        </span>
        <button onClick={() => handleChangeClick()}>{buttonChangeValue}</button>
      </li>
    </>
  );
}

export default Player;
