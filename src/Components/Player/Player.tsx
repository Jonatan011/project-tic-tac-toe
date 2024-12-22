import { useState } from "react";

function Player({
  namePlayer,
  onChangeName,
  keyName,
  playerSymbol,
  isActive,
}: {
  namePlayer: string;
  onChangeName: (  event: React.ChangeEvent<HTMLInputElement>,nameKey: string) => void;
  keyName: string;
  playerSymbol: string;
  isActive: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  function handleClickButton() {
    setIsEditing((isEditing) => !isEditing);
  }


  const playerNameField = isEditing ? (
    <input
      type="text"
      name=""
      id=""
      required
      value={namePlayer}
      onChange={(event) => onChangeName(event, keyName)}
    />
  ) : (
    <span className="player-name">{namePlayer}</span>
  );

  const buttonChangeValue = isEditing ? "Guardar" : "Cambiar";
  return (
    <>
      <li className={isActive ? "active" : undefined}>
        <span className="player">
          {playerNameField}
          <span className="player-symbol">{playerSymbol}</span>
        </span>
        <button disabled={!isActive} onClick={() => handleClickButton()}>{buttonChangeValue}</button>
      </li>
    </>
  );
}

export default Player;
